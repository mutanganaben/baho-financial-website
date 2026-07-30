import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import {
  CreateAdminUserDto,
  UpdateAdminUserDto,
  ResetPasswordDto,
} from './dto/user-management.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.adminUser.findUnique({
      where: { email: dto.email.toLowerCase().trim() },
    });

    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password credentials.');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password credentials.');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      success: true,
      message: 'Admin authentication successful.',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }

  /**
   * List all admin users (without passwords)
   */
  async findAllUsers() {
    const users = await this.prisma.adminUser.findMany({
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return users;
  }

  /**
   * Create a new credit officer or admin user
   */
  async createUser(dto: CreateAdminUserDto) {
    const emailNormalized = dto.email.toLowerCase().trim();
    const existing = await this.prisma.adminUser.findUnique({
      where: { email: emailNormalized },
    });

    if (existing) {
      throw new BadRequestException(
        `Admin user with email "${dto.email}" already exists.`,
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.adminUser.create({
      data: {
        email: emailNormalized,
        fullName: dto.fullName,
        password: hashedPassword,
        role: dto.role || 'CREDIT_OFFICER',
        isActive: dto.isActive ?? true,
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      message: 'Admin staff account created successfully.',
      data: user,
    };
  }

  /**
   * Update admin user info or active status
   */
  async updateUser(id: string, dto: UpdateAdminUserDto) {
    const existing = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Admin user with ID "${id}" not found.`);
    }

    if (dto.email && dto.email.toLowerCase().trim() !== existing.email) {
      const emailTaken = await this.prisma.adminUser.findUnique({
        where: { email: dto.email.toLowerCase().trim() },
      });
      if (emailTaken) {
        throw new BadRequestException(
          `Email "${dto.email}" is already in use by another user.`,
        );
      }
    }

    const updated = await this.prisma.adminUser.update({
      where: { id },
      data: {
        ...(dto.email ? { email: dto.email.toLowerCase().trim() } : {}),
        ...(dto.fullName ? { fullName: dto.fullName } : {}),
        ...(dto.role ? { role: dto.role } : {}),
        ...(dto.isActive !== undefined ? { isActive: dto.isActive } : {}),
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      message: 'Admin staff account updated successfully.',
      data: updated,
    };
  }

  /**
   * Change self password (for logged-in admin)
   */
  async changeSelfPassword(userId: string, currentPass: string, newPass: string) {
    const user = await this.prisma.adminUser.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('Admin user profile not found.');
    }

    const isMatch = await bcrypt.compare(currentPass, user.password);
    if (!isMatch) {
      throw new BadRequestException('Current password entered is incorrect.');
    }

    const hashedPassword = await bcrypt.hash(newPass, 10);

    await this.prisma.adminUser.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: 'Your password has been changed successfully.',
    };
  }

  /**
   * Reset password for an admin user
   */
  async resetPassword(id: string, dto: ResetPasswordDto) {
    const existing = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Admin user with ID "${id}" not found.`);
    }

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.adminUser.update({
      where: { id },
      data: { password: hashedPassword },
    });

    return {
      success: true,
      message: `Password for "${existing.fullName}" reset successfully.`,
    };
  }

  /**
   * Delete an admin user account
   */
  async deleteUser(id: string) {
    const existing = await this.prisma.adminUser.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Admin user with ID "${id}" not found.`);
    }

    await this.prisma.adminUser.delete({
      where: { id },
    });

    return {
      success: true,
      message: `Admin user "${existing.fullName}" deleted successfully.`,
    };
  }
}

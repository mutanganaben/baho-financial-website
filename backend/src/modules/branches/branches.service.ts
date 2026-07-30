import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBranchDto, UpdateBranchDto } from './dto/create-branch.dto';

@Injectable()
export class BranchesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find active branches for public website
   */
  async findAll() {
    return this.prisma.branch.findMany({
      where: { isActive: true },
      orderBy: { code: 'asc' },
    });
  }

  /**
   * Find all branches (active & inactive) for admin management
   */
  async findAllAdmin() {
    return this.prisma.branch.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create a new branch office
   */
  async create(dto: CreateBranchDto) {
    const existing = await this.prisma.branch.findUnique({
      where: { code: dto.code },
    });

    if (existing) {
      throw new BadRequestException(
        `Branch with code "${dto.code}" already exists.`,
      );
    }

    const branch = await this.prisma.branch.create({
      data: {
        code: dto.code,
        name: dto.name,
        province: dto.province,
        district: dto.district,
        address: dto.address,
        phone: dto.phone,
        email: dto.email,
        openingHours: dto.openingHours,
        latitude: dto.latitude,
        longitude: dto.longitude,
        isActive: dto.isActive ?? true,
      },
    });

    return {
      success: true,
      message: 'Branch created successfully.',
      data: branch,
    };
  }

  /**
   * Update an existing branch office
   */
  async update(id: string, dto: UpdateBranchDto) {
    const existing = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Branch with ID "${id}" not found.`);
    }

    const updated = await this.prisma.branch.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      message: 'Branch updated successfully.',
      data: updated,
    };
  }

  /**
   * Delete a branch office
   */
  async remove(id: string) {
    const existing = await this.prisma.branch.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Branch with ID "${id}" not found.`);
    }

    await this.prisma.branch.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Branch deleted successfully.',
    };
  }
}

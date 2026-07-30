import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import {
  CreateAdminUserDto,
  UpdateAdminUserDto,
  ResetPasswordDto,
} from './dto/user-management.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req: any) {
    return {
      success: true,
      user: req.user,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/change-password')
  async changeSelfPassword(
    @Request() req: any,
    @Body('currentPassword') currentPass: string,
    @Body('newPassword') newPass: string,
  ) {
    return this.authService.changeSelfPassword(
      req.user.id,
      currentPass,
      newPass,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  async findAllUsers() {
    return this.authService.findAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Post('users')
  async createUser(@Body() dto: CreateAdminUserDto) {
    return this.authService.createUser(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateAdminUserDto,
  ) {
    return this.authService.updateUser(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id/reset-password')
  async resetPassword(
    @Param('id') id: string,
    @Body() dto: ResetPasswordDto,
  ) {
    return this.authService.resetPassword(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(id);
  }
}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find active products for public catalog
   */
  async findAll() {
    return this.prisma.product.findMany({
      where: { isActive: true },
      orderBy: { minAmount: 'asc' },
    });
  }

  /**
   * Find all products (active & inactive) for admin management
   */
  async findAllAdmin() {
    return this.prisma.product.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Create a new product
   */
  async create(dto: CreateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { slug: dto.slug },
    });

    if (existing) {
      throw new BadRequestException(
        `Product with slug "${dto.slug}" already exists.`,
      );
    }

    const product = await this.prisma.product.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        category: dto.category,
        description: dto.description,
        minAmount: dto.minAmount,
        maxAmount: dto.maxAmount,
        interestRate: dto.interestRate,
        maxTenureMonths: dto.maxTenureMonths,
        isActive: dto.isActive ?? true,
      },
    });

    return {
      success: true,
      message: 'Product created successfully.',
      data: product,
    };
  }

  /**
   * Update an existing product
   */
  async update(id: string, dto: UpdateProductDto) {
    const existing = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    const updated = await this.prisma.product.update({
      where: { id },
      data: dto,
    });

    return {
      success: true,
      message: 'Product updated successfully.',
      data: updated,
    };
  }

  /**
   * Delete a product
   */
  async remove(id: string) {
    const existing = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Product with ID "${id}" not found.`);
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return {
      success: true,
      message: 'Product deleted successfully.',
    };
  }
}

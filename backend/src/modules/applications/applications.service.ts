import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ApplicationStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateApplicationDto } from './dto/create-application.dto';

@Injectable()
export class ApplicationsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Generates a unique tracking reference number (e.g. APP-2026-8941)
   */
  private async generateReferenceNumber(): Promise<string> {
    const year = new Date().getFullYear();
    let isUnique = false;
    let refNumber = '';

    while (!isUnique) {
      const randomCode = Math.floor(1000 + Math.random() * 9000);
      refNumber = `APP-${year}-${randomCode}`;

      const existing = await this.prisma.application.findUnique({
        where: { referenceNumber: refNumber },
      });

      if (!existing) {
        isUnique = true;
      }
    }

    return refNumber;
  }

  /**
   * Create a new online loan application
   */
  async create(dto: CreateApplicationDto) {
    try {
      // 1. Verify that the requested product slug exists
      const product = await this.prisma.product.findUnique({
        where: { slug: dto.productSlug },
      });

      if (!product) {
        throw new BadRequestException(
          `Invalid product selected: "${dto.productSlug}" does not exist.`,
        );
      }

      // 2. Validate loan amount against product min/max limits
      if (dto.amountRequested < product.minAmount) {
        throw new BadRequestException(
          `Minimum loan amount for ${product.name} is RWF ${product.minAmount.toLocaleString()}`,
        );
      }

      if (dto.amountRequested > product.maxAmount) {
        throw new BadRequestException(
          `Maximum loan amount for ${product.name} is RWF ${product.maxAmount.toLocaleString()}`,
        );
      }

      // 3. Generate unique tracking reference number
      const referenceNumber = await this.generateReferenceNumber();

      // 4. Save application to PostgreSQL database
      const application = await this.prisma.application.create({
        data: {
          referenceNumber,
          productSlug: dto.productSlug,
          amountRequested: dto.amountRequested,
          durationMonths: dto.durationMonths,
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          nationalId: dto.nationalId,
          district: dto.district,
          loanPurpose: dto.loanPurpose,
          preferredBranch: dto.preferredBranch,
          notes: dto.notes,
        },
      });

      return {
        success: true,
        message:
          'Your loan application has been submitted successfully. Please save your reference number for tracking.',
        referenceNumber: application.referenceNumber,
        data: application,
      };
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      console.error('Error processing loan application:', error);
      throw new InternalServerErrorException(
        'Failed to process loan application. Please try again later.',
      );
    }
  }

  /**
   * List all applications (for Admin dashboard)
   */
  async findAll() {
    return this.prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Find application by unique reference number (for Applicant tracking)
   */
  async findByReference(referenceNumber: string) {
    const application = await this.prisma.application.findUnique({
      where: { referenceNumber },
    });

    if (!application) {
      throw new NotFoundException(
        `Application with reference number "${referenceNumber}" was not found.`,
      );
    }

    return {
      success: true,
      data: application,
    };
  }

  /**
   * Update application status (for Admin underwriting dashboard)
   */
  async updateStatus(id: string, status: ApplicationStatus, notes?: string) {
    const existing = await this.prisma.application.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Application with ID "${id}" not found.`);
    }

    const updated = await this.prisma.application.update({
      where: { id },
      data: {
        status,
        ...(notes ? { notes } : {}),
      },
    });

    return {
      success: true,
      message: `Application status updated to ${status}.`,
      data: updated,
    };
  }
}

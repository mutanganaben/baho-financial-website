import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { MessageStatus } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateContactDto) {
    try {
      const contact = await this.prisma.contactMessage.create({
        data: {
          fullName: dto.fullName,
          email: dto.email,
          phone: dto.phone,
          subject: dto.subject,
          message: dto.message,
        },
      });

      return {
        success: true,
        message:
          'Your message has been received. We will get back to you shortly.',
        data: contact,
      };
    } catch (error) {
      console.error('Error saving contact message:', error);
      throw new InternalServerErrorException('Failed to process your message.');
    }
  }

  async findAll() {
    return this.prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateStatus(id: string, status: MessageStatus) {
    const existing = await this.prisma.contactMessage.findUnique({
      where: { id },
    });

    if (!existing) {
      throw new NotFoundException(`Contact message with ID "${id}" not found.`);
    }

    const updated = await this.prisma.contactMessage.update({
      where: { id },
      data: { status },
    });

    return {
      success: true,
      data: updated,
    };
  }
}

import { Controller, Post, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { MessageStatus } from '@prisma/client';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.contactsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: MessageStatus,
  ) {
    return this.contactsService.updateStatus(id, status);
  }
}

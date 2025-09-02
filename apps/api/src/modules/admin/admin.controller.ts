import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@prisma/client';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SignUploadDto } from './dto/sign-upload.dto';
import { CreateImageDto } from './dto/create-image.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // İlan yönetimi
  @Get('properties')
  async getProperties(
    @Query('search') search?: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('take', new DefaultValuePipe(12), ParseIntPipe) take: number = 12,
  ) {
    return this.adminService.getProperties(search, page, take);
  }

  @Get('properties/:id')
  async getProperty(@Param('id') id: string) {
    return this.adminService.getProperty(id);
  }

  @Post('properties')
  async createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.adminService.createProperty(createPropertyDto);
  }

  @Patch('properties/:id')
  async updateProperty(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.adminService.updateProperty(id, updatePropertyDto);
  }

  @Delete('properties/:id')
  async deleteProperty(@Param('id') id: string) {
    return this.adminService.deleteProperty(id);
  }

  // Görsel yükleme - pre-signed PUT
  @Post('uploads/sign')
  async signUpload(@Body() signUploadDto: SignUploadDto) {
    return this.adminService.signUpload(signUploadDto);
  }

  // İsteğe bağlı: İlan görselleri
  @Post('properties/:id/images')
  async addPropertyImage(
    @Param('id') propertyId: string,
    @Body() createImageDto: CreateImageDto,
  ) {
    return this.adminService.addPropertyImage(propertyId, createImageDto);
  }
}

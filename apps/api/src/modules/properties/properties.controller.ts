import { Controller, Get, Param, Query } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertyFiltersDto } from './dto/property-filters.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}

  @Get()
  async findAll(@Query() filters: PropertyFiltersDto) {
    return this.propertiesService.findAll(filters);
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    return this.propertiesService.findBySlug(slug);
  }
}

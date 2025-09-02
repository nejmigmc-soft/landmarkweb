import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PropertyFiltersDto } from './dto/property-filters.dto';

@Injectable()
export class PropertiesService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(filters: PropertyFiltersDto) {
    const { 
      page = 1, 
      pageSize = 20, 
      take = 12, 
      skip = 0,
      sort = 'createdAt:desc', 
      ...whereFilters 
    } = filters;
    
    // Build where clause
    const where: any = {
      published: true,
    };

    if (whereFilters.q) {
      where.OR = [
        { title: { contains: whereFilters.q, mode: 'insensitive' } },
        { description: { contains: whereFilters.q, mode: 'insensitive' } },
      ];
    }

    if (whereFilters.type) where.type = whereFilters.type;
    if (whereFilters.status) where.status = whereFilters.status;
    if (whereFilters.city) where.location = { path: '$.city', equals: whereFilters.city };
    if (whereFilters.district) where.location = { path: '$.district', equals: whereFilters.district };
    if (whereFilters.rooms) where.rooms = whereFilters.rooms;
    if (whereFilters.minPrice) where.price = { gte: whereFilters.minPrice };
    if (whereFilters.maxPrice) where.price = { lte: whereFilters.maxPrice };
    if (whereFilters.min) where.price = { gte: whereFilters.min };
    if (whereFilters.max) where.price = { lte: whereFilters.max };

    // Parse sort
    const [sortField, sortOrder] = sort.split(':');
    const orderBy = { [sortField]: sortOrder === 'desc' ? 'desc' : 'asc' };

    // Determine pagination parameters
    // Priority: take/skip over page/pageSize
    const finalTake = take || pageSize;
    const finalSkip = skip !== undefined ? skip : (page - 1) * pageSize;

    // Get total count
    const total = await this.prisma.prisma.property.count({ where });

    // Get properties with pagination
    const items = await this.prisma.prisma.property.findMany({
      where,
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy,
      skip: finalSkip,
      take: finalTake,
    });

    // Return the format requested: { items, total }
    return {
      items,
      total,
    };
  }

  async findBySlug(slug: string) {
    const property = await this.prisma.prisma.property.findUnique({
      where: { slug, published: true },
      include: {
        images: {
          orderBy: { order: 'asc' },
        },
        agent: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('Property not found');
    }

    return property;
  }
}

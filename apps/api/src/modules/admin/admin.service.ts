import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { SignUploadDto } from './dto/sign-upload.dto';
import { CreateImageDto } from './dto/create-image.dto';
import { Prisma, PropertyType } from '@prisma/client';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class AdminService {
  private readonly s3: S3Client;

  constructor(private readonly prisma: PrismaService) {
    this.s3 = new S3Client({
      region: process.env.S3_REGION ?? 'auto',
      endpoint: process.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
      },
    });
  }

  async getProperties(search?: string, page: number = 1, take: number = 12) {
    const skip = (page - 1) * take;
    
    const where = search ? {
      OR: [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { 'location.city': { contains: search, mode: 'insensitive' } },
        { 'location.district': { contains: search, mode: 'insensitive' } },
      ],
    } : {};

    const [items, total] = await Promise.all([
      this.prisma.prisma.property.findMany({
        where,
        include: {
          agent: {
            select: { id: true, name: true, email: true },
          },
          images: {
            orderBy: { order: 'asc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take,
      }),
      this.prisma.prisma.property.count({ where }),
    ]);

    return {
      items,
      total,
      page,
      take,
      totalPages: Math.ceil(total / take),
    };
  }

  async getProperty(id: string) {
    const property = await this.prisma.prisma.property.findUnique({
      where: { id },
      include: {
        agent: {
          select: { id: true, name: true, email: true },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!property) {
      throw new NotFoundException('İlan bulunamadı');
    }

    return property;
  }

  async createProperty(createPropertyDto: CreatePropertyDto) {
    const { tags, ...propertyData } = createPropertyDto;

    const property = await this.prisma.prisma.property.create({
      data: {
        ...propertyData,
        price: propertyData.price,
        location: propertyData.location as unknown as Prisma.InputJsonValue,
        ...(tags && tags.length > 0
          ? {
              tags: {
                create: tags.map((tagName) => ({
                  tag: {
                    connectOrCreate: {
                      where: { slug: this.slugify(tagName) },
                      create: {
                        name: tagName,
                        slug: this.slugify(tagName),
                      },
                    },
                  },
                })),
              },
            }
          : {}),
      },
      include: {
        agent: {
          select: { id: true, name: true, email: true },
        },
        images: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return property;
  }

  async updateProperty(id: string, updatePropertyDto: UpdatePropertyDto) {
    const { tags, ...propertyData } = updatePropertyDto;

    const existingProperty = await this.prisma.prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      throw new NotFoundException('İlan bulunamadı');
    }

    const property = await this.prisma.prisma.property.update({
      where: { id },
      data: {
        ...propertyData,
        price: propertyData.price ?? undefined,
        location: propertyData.location as unknown as Prisma.InputJsonValue,
        ...(Array.isArray(tags)
          ? {
              tags: {
                deleteMany: {}, // tüm mevcut eşleşmeleri temizle
                create: tags.map((tagName) => ({
                  tag: {
                    connectOrCreate: {
                      where: { slug: this.slugify(tagName) },
                      create: {
                        name: tagName,
                        slug: this.slugify(tagName),
                      },
                    },
                  },
                })),
              },
            }
          : {}),
      },
      include: {
        agent: {
          select: { id: true, name: true, email: true },
        },
        images: {
          orderBy: { order: 'asc' },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return property;
  }

  async deleteProperty(id: string) {
    const existingProperty = await this.prisma.prisma.property.findUnique({
      where: { id },
    });

    if (!existingProperty) {
      throw new NotFoundException('İlan bulunamadı');
    }

    await this.prisma.prisma.property.delete({
      where: { id },
    });

    return { message: 'İlan başarıyla silindi' };
  }

  async signUpload(signUploadDto: SignUploadDto) {
    const { fileName, contentType } = signUploadDto;
    const key = `properties/${Date.now()}-${fileName}`;
    
    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET!,
      Key: key,
      ContentType: contentType,
    });

    const uploadUrl = await getSignedUrl(this.s3, command, { expiresIn: 60 });
    const publicUrl = `${process.env.S3_PUBLIC_URL}/${key}`;

    return { uploadUrl, publicUrl, key };
  }

  async addPropertyImage(propertyId: string, createImageDto: CreateImageDto) {
    const { url, alt, order = 0, isCover = false } = createImageDto;

    const existingProperty = await this.prisma.prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (!existingProperty) {
      throw new NotFoundException('İlan bulunamadı');
    }

    // Eğer bu görsel kapak olarak işaretleniyorsa, diğerlerini kapak olmaktan çıkar
    if (isCover) {
      await this.prisma.prisma.propertyImage.updateMany({
        where: { propertyId },
        data: { order: { increment: 1 } },
      });
    }

    const image = await this.prisma.prisma.propertyImage.create({
      data: {
        url,
        alt: alt || `image-${Date.now()}`,
        order: isCover ? 0 : order,
        propertyId,
      },
    });

    return image;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
}

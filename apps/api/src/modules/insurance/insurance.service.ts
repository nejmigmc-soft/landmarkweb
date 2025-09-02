import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Injectable()
export class InsuranceService {
  constructor(private prisma: PrismaService) {}

  async getProducts() {
    return this.prisma.prisma.insuranceProduct.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
  }

  async createQuote(createQuoteDto: CreateQuoteDto) {
    const product = await this.prisma.prisma.insuranceProduct.findUnique({
      where: { slug: createQuoteDto.productSlug },
    });

    if (!product) {
      throw new Error('Insurance product not found');
    }

    return this.prisma.prisma.insuranceQuote.create({
      data: {
        fullName: createQuoteDto.fullName,
        email: createQuoteDto.email,
        phone: createQuoteDto.phone,
        city: createQuoteDto.city,
        details: createQuoteDto.details,
        productId: product.id,
      },
    });
  }
}

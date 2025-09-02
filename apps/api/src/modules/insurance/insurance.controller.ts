import { Controller, Get, Post, Body, ValidationPipe } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

@Controller('insurance')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}

  @Get('products')
  async getProducts() {
    const products = await this.insuranceService.getProducts();
    return { products };
  }

  @Post('quote')
  async createQuote(@Body(ValidationPipe) createQuoteDto: CreateQuoteDto) {
    await this.insuranceService.createQuote(createQuoteDto);
    return { ok: true, message: 'Quote request submitted successfully' };
  }
}

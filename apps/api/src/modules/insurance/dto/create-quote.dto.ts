import { IsString, IsEmail, IsOptional, IsObject } from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsString()
  productSlug: string;

  @IsOptional()
  @IsObject()
  details?: Record<string, any>;
}

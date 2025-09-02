import { IsString, IsEnum, IsNumber, IsOptional, IsBoolean, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType, PropertyStatus, Currency } from '@prisma/client';

class LocationDto {
  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsOptional()
  @IsString()
  neighborhood?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsNumber()
  lat?: number;

  @IsOptional()
  @IsNumber()
  lng?: number;
}

export class CreatePropertyDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsString()
  description: string;

  @IsEnum(PropertyType)
  type: PropertyType;

  @IsEnum(PropertyStatus)
  status: PropertyStatus;

  @IsNumber()
  price: number;

  @IsEnum(Currency)
  currency: Currency;

  @IsString()
  rooms: string;

  @IsOptional()
  @IsNumber()
  bath?: number;

  @IsOptional()
  @IsNumber()
  netM2?: number;

  @IsOptional()
  @IsNumber()
  grossM2?: number;

  @IsOptional()
  @IsNumber()
  floor?: number;

  @IsOptional()
  @IsNumber()
  totalFloor?: number;

  @IsOptional()
  @IsString()
  heating?: string;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsBoolean()
  furnished?: boolean;

  @ValidateNested()
  @Type(() => LocationDto)
  location: LocationDto;

  @IsOptional()
  @IsArray()
  features?: string[];

  @IsOptional()
  @IsString()
  videoUrl?: string;

  @IsString()
  agentId: string;

  @IsOptional()
  @IsBoolean()
  published?: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}

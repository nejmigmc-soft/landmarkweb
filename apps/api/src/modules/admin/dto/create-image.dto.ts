import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateImageDto {
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  alt?: string;

  @IsOptional()
  @IsNumber()
  order?: number;

  @IsOptional()
  @IsBoolean()
  isCover?: boolean;
}

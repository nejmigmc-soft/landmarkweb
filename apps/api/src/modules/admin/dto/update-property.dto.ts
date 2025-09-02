import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  /** create dto'da olmayabilir ama update'te gelebilir */
  tags?: string[];                 // İlan etiketleri (string listesi)
  price?: number;                  // Fiyat güncellemesi
  location?: Record<string, any>;  // Prisma JSON alanı için serbest tip
}
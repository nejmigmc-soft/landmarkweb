import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto extends PartialType(CreatePropertyDto) {
  // listede kullandığımız "etiket" alanı opsiyonel string[]
  tags?: string[];
}
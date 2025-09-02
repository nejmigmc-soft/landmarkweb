import { IsString } from 'class-validator';

export class SignUploadDto {
  @IsString()
  fileName: string;

  @IsString()
  contentType: string;
}

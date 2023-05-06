import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SetupCompanyDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

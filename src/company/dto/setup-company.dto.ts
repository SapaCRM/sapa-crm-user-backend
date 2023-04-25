import { IsNotEmpty, IsString } from 'class-validator';

export class SetupCompanyDto {
  @IsString()
  @IsNotEmpty()
  apiKey: string;
}

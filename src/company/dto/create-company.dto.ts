import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsEmail()
  userEmail: string;

  @IsString()
  //   @Matches(
  //     // eslint-disable-next-line prettier/prettier
  //     "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$",
  //     // '',
  //     // {
  //     //   message: 'Please input correct password details',
  //     // },
  //   )
  userPassword: string;
}

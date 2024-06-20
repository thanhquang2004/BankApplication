import { IsDateString, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsString()
  fullName?: string;

  @IsString()
  email?: string;

  @IsDateString()
  dateOfBirth?: string;

  @IsString()
  phoneNumber?: string;

  @IsString()
  address?: string;
}

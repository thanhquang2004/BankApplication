import { IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  accountNumber: string;
}

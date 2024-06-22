import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  toAccountNumber?: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsString()
  description?: string;

  @IsNotEmpty()
  type: string;

  @IsNumber()
  accountId: number;
}

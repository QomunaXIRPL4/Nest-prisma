import { IsInt } from 'class-validator';

export class ReturnBorrowDto {
  @IsInt()
  borrowId: number;
}

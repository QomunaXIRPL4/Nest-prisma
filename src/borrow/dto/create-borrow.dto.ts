import { IsInt, Min } from 'class-validator';

export class CreateBorrowDto {
  @IsInt()
  @Min(1)
  studentId: number;

  @IsInt()
  @Min(1)
  bookId: number;
}

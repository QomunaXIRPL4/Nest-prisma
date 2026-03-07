import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  UseGuards,
} from '@nestjs/common';
import { BorrowService } from './borrow.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('borrow')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  // PINJAM BUKU
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Post()
  borrow(@Body() body: { studentId: number; bookId: number }) {
    return this.borrowService.borrowBook(
      body.studentId,
      body.bookId,
    );
  }

  // KEMBALIKAN BUKU
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id/return')
  returnBook(@Param('id') id: string) {
    return this.borrowService.returnBook(Number(id));
  }

  // RIWAYAT PEMINJAMAN
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }
}

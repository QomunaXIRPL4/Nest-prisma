import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BorrowService {
  constructor(private prisma: PrismaService) {}

  // ================= PINJAM BUKU =================
  async borrowBook(studentId: number, bookId: number) {
    // cek student
    const student = await this.prisma.student.findUnique({
      where: { id: studentId },
    });
    if (!student) {
      throw new NotFoundException('Student not found');
    }

    // cek book
    const book = await this.prisma.book.findUnique({
      where: { id: bookId },
    });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    // cek apakah buku sedang dipinjam (belum dikembalikan)
    const activeBorrow = await this.prisma.borrow.findFirst({
      where: {
        bookId,
        returnedAt: null,
      },
    });

    if (activeBorrow) {
      throw new BadRequestException('Book is currently borrowed');
    }

    // tanggal pinjam
    const borrowedAt = new Date();

    // tanggal jatuh tempo (7 hari setelah pinjam)
    const dueAt = new Date(borrowedAt);
    dueAt.setDate(dueAt.getDate() + 7);

    return this.prisma.borrow.create({
      data: {
        studentId,
        bookId,
        borrowedAt,
        dueAt,
      },
    });
  }

  // ================= KEMBALIKAN BUKU =================
  async returnBook(id: number) {
    const borrow = await this.prisma.borrow.findUnique({
      where: { id },
    });

    if (!borrow) {
      throw new NotFoundException('Borrow data not found');
    }

    if (borrow.returnedAt) {
      throw new BadRequestException('Book already returned');
    }

    return this.prisma.borrow.update({
      where: { id },
      data: {
        returnedAt: new Date(),
      },
    });
  }

  // ================= RIWAYAT PEMINJAMAN =================
  async findAll() {
    return this.prisma.borrow.findMany({
      orderBy: {
        borrowedAt: 'desc',
      },
      include: {
        student: {
          select: {
            id: true,
            nis: true,
            name: true,
          },
        },
        book: {
          select: {
            id: true,
            title: true,
            author: true,
          },
        },
      },
    });
  }
}

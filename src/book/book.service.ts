import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.book.create({ data });
  }

  findAll() {
    return this.prisma.book.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const book = await this.prisma.book.findUnique({
      where: { id },
    });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  findByTitle(title: string) {
    return this.prisma.book.findMany({
      where: {
        title: {
          contains: title,
        },
      },
    });
  }

  findByAuthor(author: string) {
    return this.prisma.book.findMany({
      where: {
        author: {
          contains: author,
        },
      },
    });
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.book.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.book.delete({
      where: { id },
    });
  }
}

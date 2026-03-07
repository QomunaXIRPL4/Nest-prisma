import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  create(data: any) {
    return this.prisma.student.create({ data });
  }

  findAll() {
    return this.prisma.student.findMany({
      orderBy: { id: 'desc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // 🔍 FIND BY NIS
  async findByNis(nis: string) {
    const student = await this.prisma.student.findUnique({
      where: { nis },
    });
    if (!student) throw new NotFoundException('Student not found');
    return student;
  }

  // 🔍 FIND BY NAME
  async findByName(name: string) {
    const students = await this.prisma.student.findMany({
      where: {
        name: {
          contains: name,
        },
      },
    });

    if (students.length === 0) {
      throw new NotFoundException('Student not found');
    }

    return students;
  }

  async update(id: number, data: any) {
    await this.findOne(id);
    return this.prisma.student.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.student.delete({
      where: { id },
    });
  }
}

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Books')
@ApiBearerAuth()
@Controller('book')
@UseGuards(JwtAuthGuard, RolesGuard)
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // CREATE BOOK (ADMIN & PETUGAS)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Post()
  @ApiOperation({ summary: 'Membuat buku baru' })
  create(@Body() data: any) {
    return this.bookService.create(data);
  }

  // READ ALL / FILTER BOOK
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Get()
  @ApiOperation({ summary: 'Menampilkan seluruh data buku' })
  findAll(
    @Query('title') title?: string,
    @Query('author') author?: string,
  ) {
    if (title) return this.bookService.findByTitle(title);
    if (author) return this.bookService.findByAuthor(author);
    return this.bookService.findAll();
  }

  // ✅ READ BOOK BY ID 
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(Number(id));
  }

  // UPDATE BOOK
  @Roles(UserRole.ADMIN, UserRole.PETUGAS)
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.bookService.update(Number(id), data);
  }

  // DELETE BOOK (ADMIN SAJA)
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookService.remove(Number(id));
  }
}

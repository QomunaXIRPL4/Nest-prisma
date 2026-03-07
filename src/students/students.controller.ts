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
import { StudentsService } from './students.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('students')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  // CREATE
  @Post()
  create(@Body() data: any) {
    return this.studentsService.create(data);
  }

  // GET ALL / BY NIS / BY NAME
  @Get()
  findAll(
    @Query('nis') nis?: string,
    @Query('name') name?: string,
  ) {
    if (nis) {
      return this.studentsService.findByNis(nis);
    }

    if (name) {
      return this.studentsService.findByName(name);
    }

    return this.studentsService.findAll();
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentsService.findOne(Number(id));
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() data: any) {
    return this.studentsService.update(Number(id), data);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { StudentsModule } from './students/students.module';
import { BookModule } from './book/book.module';
import { BorrowModule } from './borrow/borrow.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env',
    }),

    PrismaModule,
    StudentsModule,
    BookModule,
    BorrowModule,
    AuthModule,
  ],
})
export class AppModule {}
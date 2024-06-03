import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [PrismaModule, AuthModule, CoursesModule],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}

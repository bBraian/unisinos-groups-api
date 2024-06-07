import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SubjectModule } from './subject/subject.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [PrismaModule, AuthModule, CourseModule, FeedbackModule, SubjectModule, LinkModule],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}

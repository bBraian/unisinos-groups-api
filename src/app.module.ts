import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedbackModule } from './feedback/feedback.module';
import { FeedbackModule } from './feedback/feedback.module';

@Module({
  imports: [PrismaModule, AuthModule, CoursesModule, FeedbackModule],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}

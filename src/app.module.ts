import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { CourseModule } from './course/course.module';
import { FeedbackModule } from './feedback/feedback.module';
import { SubjectModule } from './subject/subject.module';
import { LinkModule } from './link/link.module';
import { LogService } from './log/log.service';
import { RateLimitMiddleware } from './log/log.middleware';
import { PullRequestModule } from './pull_request/pull_request.module';

@Module({
  imports: [PrismaModule, AuthModule, CourseModule, FeedbackModule, SubjectModule, LinkModule, PullRequestModule],
  controllers: [AccountController],
  providers: [LogService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(RateLimitMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.POST }, { path: '*', method: RequestMethod.PUT });
  }
}

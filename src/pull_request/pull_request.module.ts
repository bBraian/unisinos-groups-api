import { Module } from '@nestjs/common';
import { PullRequestService } from './pull_request.service';
import { PullRequestController } from './pull_request.controller';

@Module({
  controllers: [PullRequestController],
  providers: [PullRequestService],
})
export class PullRequestModule {}

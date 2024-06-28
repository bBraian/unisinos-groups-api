import { Controller, Get, Param, Put } from '@nestjs/common';
import { PullRequestService } from './pull_request.service';

@Controller('pull-request')
export class PullRequestController {
  constructor(private readonly pullRequestService: PullRequestService) {}

  @Get()
  findAll() {
    return this.pullRequestService.findAll();
  }

  @Put('/approve/:id')
  approvePr(@Param('id') id: string) {
    return this.pullRequestService.approvePr(+id);
  }

  @Put('/reject/:id')
  rejectPr(@Param('id') id: string) {
    return this.pullRequestService.rejectPr(+id);
  }
}

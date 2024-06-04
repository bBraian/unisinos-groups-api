import { Controller, Get, Post, Body, Param, UsePipes, HttpCode } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackBodySchema, createFeedbackBodySchema } from './@types.feedback';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) {}

  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createFeedbackBodySchema))
  create(@Body() body: CreateFeedbackBodySchema) {
    return this.feedbackService.create(body);
  }

  @Get()
  findAll() {
    return this.feedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedbackService.findOne(+id);
  }
}

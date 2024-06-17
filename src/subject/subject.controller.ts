import { Controller, Get, Post, Body, UseGuards, HttpCode, UsePipes } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectBodySchema, createSubjectBodySchema } from './@types.subject';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createSubjectBodySchema))
  create(@Body() body: CreateSubjectBodySchema) {
    return this.subjectService.create(body);
  }

  @Post('pr')
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createSubjectBodySchema))
  createPR(@Body() body: CreateSubjectBodySchema) {
    console.log(body)
    return this.subjectService.createPR(body);
  }

  @Get()
  findAll() {
    return this.subjectService.findAll();
  }
}

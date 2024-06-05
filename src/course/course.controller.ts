import { Controller, Get, Post, Body, Param, UseGuards, HttpCode, UsePipes } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseBodySchema, createCourseBodySchema } from './@types.course';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

@Controller('course')
export class CourseController {
  constructor(private readonly coursesService: CourseService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createCourseBodySchema))
  create(@Body() body: CreateCourseBodySchema) {
    return this.coursesService.create(body);
  }

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(+id);
  }
}

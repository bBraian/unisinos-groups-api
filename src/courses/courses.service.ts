import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseBodySchema } from './@types.courses';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateCourseBodySchema) {
    return 'This action adds a new course';
  }

  async findAll() {
    const courses = await this.prisma.courses.findMany()

    return {
      courses
    }
  }

  async findOne(id: number) {
    const course = await this.prisma.courses.findUnique({
      where: {
        id
      }
    })

    if(!course) {
      throw new NotFoundException('Course not found')
    }

    return {
      course
    }
  }
}

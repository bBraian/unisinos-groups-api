import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseBodySchema } from './@types.course';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  create(body: CreateCourseBodySchema) {
    return 'This action adds a new course';
  }

  async findAll() {
    const course = await this.prisma.course.findMany()

    return {
      course
    }
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
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

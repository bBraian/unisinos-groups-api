import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseBodySchema } from './@types.course';

@Injectable()
export class CourseService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateCourseBodySchema) {
    const courseNameAlreadyTaken = await this.prisma.course.findMany({
      where: { name: body.name }
    })

    if(courseNameAlreadyTaken.length > 0) {
      throw new ConflictException('Nome do curso já em uso')
    }

    const createdCourse = await this.prisma.course.create({
      data: { name: body.name }
    })

    return {
      createdCourse
    }
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

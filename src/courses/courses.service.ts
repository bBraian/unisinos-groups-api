import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  create(createCourseDto: CreateCourseDto) {
    return 'This action adds a new course';
  }

  findAll() {
    return [{id: 1, name: 'ADS'}, {id: 2, name: 'CC'}];
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

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSubjectBodySchema } from './@types.subject';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateSubjectBodySchema) {
    const { title, course, image } = body
    const subject = await this.prisma.subject.create({
      data: { image, title, courseId: course }
    })
    return { subject };
  }

  createPR(body: CreateSubjectBodySchema) {
    return 'This action sends a new subject to be pull requested';
  }

  findAll() {
    return `This action returns all subject`;
  }
}

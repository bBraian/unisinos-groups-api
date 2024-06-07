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

  async createPR(body: CreateSubjectBodySchema) {
    const { course, image, title, whatsappLinks, driveLinks } = body

    const { id } = await this.prisma.prSubject.create({
      data: { status: 'WAITING_APROVAL', title, image, courseId: course }
    })

    if(whatsappLinks.length > 0) {

    }

    return {
      "message": `Disciplina ${id}: ${title} enviado para aprovação`
    }

  }

  findAll() {
    return `This action returns all subject`;
  }
}

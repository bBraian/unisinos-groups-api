import { Injectable } from '@nestjs/common';
import { CreateSubjectBodySchema } from './@types.subject';
import { PrismaService } from 'src/prisma/prisma.service';
import { LinkService } from 'src/link/link.service';

@Injectable()
export class SubjectService {
  constructor(private prisma: PrismaService, private linkService: LinkService) {}

  async create(body: CreateSubjectBodySchema) {
    const { title, course, image, whatsappLinks, driveLinks } = body
    const subject = await this.prisma.subject.create({
      data: { image, title, courseId: course }
    })

    if(whatsappLinks) {
      const data = whatsappLinks.map(link => ({ subjectId: subject.id , ...link }));
      this.linkService.createMany(data)
    }

    if(driveLinks) {
      const data = driveLinks.map(link => ({ subjectId: subject.id , ...link }));
      await this.linkService.createMany(data)
    }

    return { subject, whatsappLinks: whatsappLinks, driveLinks: driveLinks };
  }

  async createPR(body: CreateSubjectBodySchema) {
    const { course, image, title, whatsappLinks, driveLinks } = body
    const { id } = await this.prisma.prSubject.create({
      data: { status: 'WAITING_APROVAL', title, image, courseId: course }
    })

    if(whatsappLinks) {
      const data = whatsappLinks.map(link => ({ subjectId: id , ...link }));
      await this.linkService.createMany(data)
    }

    if(driveLinks) {
      const data = driveLinks.map(link => ({ subjectId: id , ...link }));
      await this.linkService.createMany(data)
    }

    return {
      "message": `Disciplina ${id}: ${title} enviado para aprovação`
    }

  }

  async findAll() {
    const subjects = await this.prisma.subject.findMany({
      include: { links: true }
    });

    return {
      subjects
    }
  }
}

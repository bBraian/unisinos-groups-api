import { Injectable, NotFoundException } from '@nestjs/common';
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
    const pullRequest = await this.prisma.pullRequest.create({
      data: { action: 'new', status: 'AWAITING_APPROVAL' }
    })

    const { course, image, title, whatsappLinks, driveLinks } = body
    const { id } = await this.prisma.prSubject.create({
      data: { pullRequestId: pullRequest.id, title, image, courseId: course }
    })

    if(whatsappLinks) {
      const data = whatsappLinks.map(link => ({ pullRequestId: pullRequest.id, subjectId: id, linkId: null, ...link }));
      await this.linkService.createManyPR(data)
    }

    if(driveLinks) {
      const data = driveLinks.map(link => ({ pullRequestId: pullRequest.id, subjectId: id, linkId: null, ...link }));
      await this.linkService.createManyPR(data)
    }

    return {
      "message": `Disciplina ${id}: ${title} enviado para aprovação`
    }

  }

  async findAll() {
    const subjects = await this.prisma.subject.findMany({
      include: { links: true }
    });

    const processedSubjects = subjects.map(subject => ({
      ...subject,
      whatsappLinks: subject.links.filter(link => link.type === 'whatsapp'),
      driveLinks: subject.links.filter(link => link.type === 'drive'),
      links: false
    }));

    return {
      subjects: processedSubjects
    }
  }

  async delete(id: number) {
    const subject = await this.prisma.subject.findUnique({
      where: { id }
    });

    if(!subject) {
      throw new NotFoundException('Registro não encontrado!')
    }

    await this.prisma.subject.delete({
      where: { id },
      include: { links: true }
    })

    return {
      "message": "Registro deletado com sucesso!"
    }
  }
}

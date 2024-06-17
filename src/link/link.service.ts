import { Injectable } from '@nestjs/common';
import { CreateLinkBodySchema, UpdateLinkBodySchema } from './@types.type';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LinkService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateLinkBodySchema) {
    const { link, subjectId, title, type } = body

    const createdLink = await this.prisma.link.create({
      data: { link, subjectId, title, type }
    })

    return {
      createdLink
    }
  }

  async createMany(body: CreateLinkBodySchema[]) {
    const createdLinks = await this.prisma.link.createMany({
      data: body
    })

    return {
      createdLinks
    }
  }

  async createManyPR(body: CreateLinkBodySchema[]) {
    const data = body.map(link => ({ status: 'WAITING_APPROVAL', ...link }));

    const createdLinks = await this.prisma.prLink.createMany({
      data: data
    })

    return {
      createdLinks
    }
  }

  async createPR(body: CreateLinkBodySchema) {
    const { link, subjectId, title, type } = body

    const createdLink = await this.prisma.prLink.create({
      data: { status: 'WAITING_APPROVAL', link, subjectId, title, type }
    })

    return {
      createdLink
    }
  }

  update(id: number, body: UpdateLinkBodySchema) {
    return `This action updates a #${id} link`;
  }

  async updatePR(id: number, body: UpdateLinkBodySchema) {
    const { link, subjectId, title, type } = body

    const linkExistOnPr = await this.prisma.prLink.findUnique({
      where: { id }
    })

    if(!linkExistOnPr) {
      const updatedLink = await this.prisma.prLink.create({
        data: { status: 'WAITING_APPROVAL', link, subjectId, title, type }
      })

      return updatedLink
    } else {
      const updatedLink = await this.prisma.prLink.update({
        data: { link, title },
        where: { id }
      })

      return updatedLink
    }
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}

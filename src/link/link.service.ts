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

  async createPR(body: CreateLinkBodySchema) {
    const { link, subjectId, title, type } = body

    const createdLink = await this.prisma.link.create({
      data: { link, subjectId, title, type }
    })

    return {
      createdLink
    }
  }

  update(id: number, body: UpdateLinkBodySchema) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateLinkBodySchema, CreatePrLinkBodySchema } from './@types.type';
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

  async createManyPR(body: CreatePrLinkBodySchema[]) {
    const createdLinks = await this.prisma.prLink.createMany({
      data: body
    })

    return {
      createdLinks
    }
  }

  async createPR(body: CreatePrLinkBodySchema) {
    const { link, subjectId, title, type, linkId } = body

    const action = linkId ? 'update' : 'new'
    const pullRequest = await this.prisma.pullRequest.create({
      data: { action, status: 'AWAITING_APPROVAL' }
    })

    const createdLink = await this.prisma.prLink.create({
      data: { pullRequestId: pullRequest.id, link, subjectId, title, type, linkId }
    })

    return {
      createdLink
    }
  }
}

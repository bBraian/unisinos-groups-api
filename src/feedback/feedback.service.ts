import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFeedbackBodySchema } from './@types.feedback';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FeedbackService {
  constructor(private prisma: PrismaService) {}

  async create(body: CreateFeedbackBodySchema) {
    const { user_name, feedback } = body
 
    const response = await this.prisma.feedback.create({
      data: { user_name, feedback }
    })

    return {
      response
    };
  }

  async findAll() {
    const feedbacks = await this.prisma.feedback.findMany()
    return {
      feedbacks
    }
  }

  async findOne(id: number) {
    const feedback = await this.prisma.feedback.findUnique({
      where: { id }
    })

    if(!feedback) {
      throw new NotFoundException('Feedback not found')
    }

    return {
      feedback
    }
  }
}

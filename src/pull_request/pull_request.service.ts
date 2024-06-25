import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PullRequestService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const pullRequests = await this.prisma.pullRequest.findMany({
      include: { PrSubject: true, PrLink: true }
    })

    const pullRequestsFormatted = pullRequests.map(pullRequest => {
      const whatsappLinks = pullRequest.PrLink.filter(link => link.type == 'whatsapp')
      const driveLinks = pullRequest.PrLink.filter(link => link.type == 'drive')
      return (
        {
          ...pullRequest,
          title: pullRequest.PrSubject[0].title,
          image: pullRequest.PrSubject[0].image,
          courseId: pullRequest.PrSubject[0].courseId,
          whatsappLinks,
          driveLinks,
          PrLink: undefined,
          PrSubject: undefined
        }
      )
    });

    return pullRequestsFormatted
  }

  findOne(id: number) {
    return `This action returns a #${id} pullRequest`;
  }

  async approvePr(id: number) {
    const pr = await this.prisma.pullRequest.findUnique({
      where: { id }
    })
    if(pr?.action == 'new') {
      const pullRequest = await this.prisma.pullRequest.findUnique({
        where: { id },
        include: { PrLink: true, PrSubject: true }
      })
      const prSubject: any = pullRequest?.PrSubject[0]
      const prLinks: any = pullRequest?.PrLink

      const subject = await this.prisma.subject.create({
        data: { image: prSubject.image, title: prSubject.title, courseId: prSubject.courseId }
      })

      let prLinksCreated = [{}]
      prLinks.forEach(async prLink => {
        const createdLink = await this.prisma.link.create({
          data: { link: prLink.link, subjectId: subject.id, title: prLink.title, type: prLink.type }
        })
        prLinksCreated = [...prLinksCreated, createdLink]
      });

      return {
        subject, 
        prLinksCreated
      }
      
    } else if(pr?.action == 'update') {

    }
    return pr;
  }

  async rejectPr(id: number) {
    const pullRequest = await this.prisma.pullRequest.update({
      data: { status: 'REJECTED' },
      where: { id }
    })

    return pullRequest
  }
}

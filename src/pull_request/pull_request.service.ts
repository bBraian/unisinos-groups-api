import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PullRequestService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const pullRequests = await this.prisma.pullRequest.findMany({
      include: { PrSubject: true, PrLink: true },
      where: { status: 'AWAITING_APPROVAL' }
    });

    
    
    const pullRequestsFormatted = await Promise.all(pullRequests.map(async pullRequest => {
      const whatsappLinks = pullRequest.PrLink.filter(link => link.type === 'whatsapp');
      const driveLinks = pullRequest.PrLink.filter(link => link.type === 'drive');
  
      if (pullRequest.action === 'new') {
        const { PrLink, PrSubject, ...rest } = pullRequest;
        return {
          ...rest,
          current: {},
          new: {
            title: pullRequest.PrSubject[0].title,
            image: pullRequest.PrSubject[0].image,
            courseId: pullRequest.PrSubject[0].courseId,
            whatsappLinks,
            driveLinks,
          }
        };
      } else if (pullRequest.action === 'new_link') {
        console.log(pullRequest)
        const prLink = pullRequest.PrLink[0]
  
        if (!prLink?.subjectId) {
          throw new NotFoundException('Erro ao buscar Link');
        }
  
        const subject = await this.prisma.subject.findFirst({
          where: { id: prLink.subjectId },
          include: { links: true }
        });


        const { PrLink, PrSubject, ...rest } = pullRequest;
        return {
          ...rest,
          current: {
            title: subject?.title,
            image: subject?.image,
            courseId: subject?.courseId,
            whatsappLinks,
            driveLinks,
          },
          new: {
            title: subject?.title,
            image: subject?.image,
            courseId: subject?.courseId,
            whatsappLinks,
            driveLinks,
          }
        };
      }
    }));
  
    return pullRequestsFormatted;
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

      await this.prisma.pullRequest.update({
        data: { status: 'APPROVED' },
        where: { id }
      })

      return {
        subject, 
        prLinksCreated
      }
      
    } else if(pr?.action == 'new_link') {
      const prLink = await this.prisma.prLink.findFirst({
        where: { pullRequestId: pr.id }
      })

      if(!prLink?.subjectId) {
        throw new NotFoundException('Erro ao buscar Link')
      }
      const subject = await this.prisma.subject.findFirst({
        where: { id: prLink?.subjectId },
        include: { links: true }
      })
      
      return {
        subject,
        prLink
      }

      
    
    } else if(pr?.action == 'update_link') {
      return 
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

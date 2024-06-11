import { Module } from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectController } from './subject.controller';
import { LinkModule } from 'src/link/link.module';

@Module({
  controllers: [SubjectController],
  providers: [SubjectService],
  imports: [LinkModule]
})
export class SubjectModule {}

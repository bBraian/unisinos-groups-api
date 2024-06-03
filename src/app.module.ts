import { Module } from '@nestjs/common';
import { AccountController } from './account/account.controller';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AccountController],
  providers: [],
})
export class AppModule {}

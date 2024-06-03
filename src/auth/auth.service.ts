import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSessionBodySchema } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { compare } from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async create(body: CreateSessionBodySchema) {
    const { email, password } = body

    const user = await this.prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) {
      throw new UnauthorizedException('User credentials invalid')
    }
    
    const isPasswordValid = await compare(password, user.password)

    if(!isPasswordValid) {
      throw new UnauthorizedException('User credentials invalid')
    }

    const accessToken = this.jwt.sign({ sub: user.id })
    
    return {
      access_token: accessToken
    }
  }
}

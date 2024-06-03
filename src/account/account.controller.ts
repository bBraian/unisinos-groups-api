import { Body, ConflictException, Controller, HttpCode, Post, UseGuards, UsePipes } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { z } from 'zod'
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe'
import { hash } from 'bcryptjs'
import { AuthGuard } from '@nestjs/passport';

const createAccountBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
})

type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

@Controller('account')
export class AccountController {
    constructor(private prisma: PrismaService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post()
    @HttpCode(201)
    @UsePipes(new ZodValidationPipe(createAccountBodySchema))
    async create(@Body() body: CreateAccountBodySchema) {
        const { name, email, password } = body

        const userWithSameEmail = await this.prisma.user.findUnique({
            where: {
              email,
            },
          })
      
          if (userWithSameEmail) {
            throw new ConflictException(
              'User with same e-mail address already exists.',
            )
          }

        const hashedPassword = await hash(password, 8)

        await this.prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        })

    }
}

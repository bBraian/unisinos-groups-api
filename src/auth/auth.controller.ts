import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

const createSessionBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export type CreateSessionBodySchema = z.infer<typeof createSessionBodySchema>

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/session")
  @UsePipes(new ZodValidationPipe(createSessionBodySchema))
  create(@Body() body: CreateSessionBodySchema) {
    return this.authService.create(body);
  }
}

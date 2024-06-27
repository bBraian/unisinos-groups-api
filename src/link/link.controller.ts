import { Controller, Post, Body, UseGuards, HttpCode, UsePipes } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkBodySchema, CreateOnePrLinkBodySchema, createLinkBodySchema, createOnePrLinkBodySchema } from './@types.type';
import { AuthGuard } from '@nestjs/passport';
import { ZodValidationPipe } from 'src/pipes/zod-validation-pipe';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(createLinkBodySchema))
  create(@Body() body: CreateLinkBodySchema) {
    return this.linkService.create(body);
  }

  @Post('/pr')
  @UsePipes(new ZodValidationPipe(createOnePrLinkBodySchema))
  createPR(@Body() body: CreateOnePrLinkBodySchema) {
    return this.linkService.createPR(body);
  }

}

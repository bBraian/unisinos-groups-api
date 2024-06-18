import { Controller, Post, Body, Param, Delete, UseGuards, HttpCode, UsePipes, Put } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkBodySchema, CreatePrLinkBodySchema, createLinkBodySchema, createPrLinkBodySchema } from './@types.type';
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
  @UsePipes(new ZodValidationPipe(createPrLinkBodySchema))
  createPR(@Body() body: CreatePrLinkBodySchema) {
    return this.linkService.createPR(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}

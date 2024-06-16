import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpCode, UsePipes, Put } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkBodySchema, UpdateLinkBodySchema, createLinkBodySchema } from './@types.type';
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
  createPR(@Body() body: CreateLinkBodySchema) {
    return this.linkService.createPR(body);
  }

  @Put('link/pr/:id')
  update(@Param('id') id: string, @Body() body: UpdateLinkBodySchema) {
    return this.linkService.updatePR(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}

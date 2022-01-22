import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseBuilder } from 'src/common/response-builder';
import { Auth } from 'src/decorators/auth.decorator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ROLE_TYPE } from '../auth/constants/role-type.constant';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dtos/create.dto';
import { CommentDto } from './dtos/retrieve-dto';

@Controller('comment')
@ApiTags('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  get() {
    return 'Get';
  }

  @Post()
  @Transactional()
  @Auth([ROLE_TYPE.USER])
  async create(
    @Req() request,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<ResponseBuilder<CommentDto>> {
    const res = await this.commentService.create(request, createCommentDto);
    return ResponseBuilder.buildSuccess(res);
  }
}

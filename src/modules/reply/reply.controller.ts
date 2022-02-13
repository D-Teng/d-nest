import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ResponseBuilder } from 'src/commons/response-builder';
import { Auth } from 'src/decorators/auth.decorator';
import { Transactional } from 'typeorm-transactional-cls-hooked';
import { ROLE_TYPE } from '../auth/constants/role-type.constant';
import { CreateReplyDto } from './dtos/create.dto';
import { ReplyDto } from './dtos/retrieve-dto';
import { ReplyService } from './reply.service';

@Controller('reply')
@ApiTags('reply')
export class ReplyController {
  constructor(private readonly replyService: ReplyService) {}

  @Get()
  get() {
    return 'Get';
  }

  @Post()
  @Transactional()
  @Auth([ROLE_TYPE.USER])
  async create(
    @Req() request,
    @Body() createReplyDto: CreateReplyDto,
  ): Promise<ResponseBuilder<ReplyDto>> {
    const res = await this.replyService.create(request, createReplyDto);
    return ResponseBuilder.buildSuccess(res);
  }
}

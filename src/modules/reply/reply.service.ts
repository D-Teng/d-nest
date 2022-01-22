import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReplyDto } from './dtos/create.dto';
import { ReplyEntity } from './entities/reply.entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyEntity)
    private readonly replyRepository: Repository<ReplyEntity>,
  ) {}

  async create(request, createReplyDto: CreateReplyDto): Promise<any> {}
}

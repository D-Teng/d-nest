import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReplyEntity } from './entities/reply.entity';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';
import { ReplyRepository } from './repositories/reply.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ReplyEntity, ReplyRepository])],
  providers: [ReplyService],
  controllers: [ReplyController],
})
export class ReplyModule {}

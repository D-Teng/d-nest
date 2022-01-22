import { EntityRepository, Repository } from 'typeorm';
import { ReplyEntity } from '../entities/reply.entity';

@EntityRepository(ReplyEntity)
export class ReplyRepository extends Repository<ReplyEntity> {}

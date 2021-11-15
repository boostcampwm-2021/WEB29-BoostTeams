import { EntityRepository, Repository } from 'typeorm';
import { Message } from '@entities/message';

@EntityRepository(Message)
export default class MessageRepository extends Repository<Message> {}

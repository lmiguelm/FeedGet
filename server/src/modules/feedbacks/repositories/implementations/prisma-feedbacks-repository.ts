import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../shared/database/prisma/prisma.service';
import {
  FeedbackCreateData,
  IFeedbackRepository,
} from '../feedbacks-repository';

@Injectable()
export class PrismaFeedbackRepository implements IFeedbackRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: FeedbackCreateData) {
    await this.prisma.feedback.create({
      data,
    });
  }
}

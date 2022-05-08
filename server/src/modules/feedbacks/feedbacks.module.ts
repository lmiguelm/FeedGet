import { Module } from '@nestjs/common';
import { MailerAdapter } from '../../shared/adapters/mail/implementations/mailler-adapter';
import { PrismaModule } from '../../shared/database/prisma/prisma.module';

import { CreateFeedbackController } from './controllers/create-feedback.controller';
import { PrismaFeedbackRepository } from './repositories/implementations/prisma-feedbacks-repository';
import { CreateFeedbackUseCase } from './use-cases/create-feedback-use-case';

@Module({
  imports: [PrismaModule],
  controllers: [CreateFeedbackController],
  providers: [
    CreateFeedbackUseCase,
    {
      provide: 'IFeedbackRepository',
      useClass: PrismaFeedbackRepository,
    },
    {
      provide: 'IMailAdapter',
      useClass: MailerAdapter,
    },
  ],
})
export class FeedbackModule {}

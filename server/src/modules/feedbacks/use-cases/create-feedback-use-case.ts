import { Inject, Injectable, BadRequestException } from '@nestjs/common';
import { IMailAdapter } from '../../../shared/adapters/mail/mail-adapter';
import { IFeedbackRepository } from '../repositories/feedbacks-repository';

interface ICreateFeedback {
  type: string;
  comment: string;
  screenshot?: string;
}

@Injectable()
export class CreateFeedbackUseCase {
  constructor(
    @Inject('IFeedbackRepository')
    private feedbackRepository: IFeedbackRepository,

    @Inject('IMailAdapter')
    private mailAdapter: IMailAdapter,
  ) {}

  async execute(data: ICreateFeedback) {
    const { type, comment, screenshot } = data;

    if (!type) {
      throw new BadRequestException('Type is required.');
    }

    if (!comment) {
      throw new BadRequestException('Comment is required.');
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new BadRequestException('Invalid screenshot format.');
    }

    await this.feedbackRepository.create(data);

    await this.mailAdapter.sendMail({
      subject: 'Feedbak recebido!',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
        `<p>Tipo do feedback: ${data.type}</p>`,
        `<p>Comentário: ${data.comment}</p>`,
        `</div>`,
      ].join('\n'),
    });
  }
}

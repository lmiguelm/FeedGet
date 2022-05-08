import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { IMailAdapter, ISendMailData } from '../mail-adapter';

@Injectable()
export class MailerAdapter implements IMailAdapter {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(data: ISendMailData) {
    return this.mailerService.sendMail({
      from: 'Equipe FeedGet <feedget@gmail.com>',
      to: 'Luis Miguel <luismiguelfernandes.marcelo@gmail.com>',
      subject: data.subject,
      html: data.body,
    });
  }
}

import { Module } from '@nestjs/common';

import { MailerModule } from '@nestjs-modules/mailer';
import { FeedbackModule } from './modules/feedbacks/feedbacks.module';

@Module({
  imports: [
    FeedbackModule,
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT as unknown as number,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

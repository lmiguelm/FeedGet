import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateFeedbackUseCase } from '../use-cases/create-feedback-use-case';

interface ICreateFeedback {
  type: string;
  comment: string;
  screenshot?: string;
}

@Controller()
export class CreateFeedbackController {
  constructor(private createFeedbackUseCase: CreateFeedbackUseCase) {}

  @Post('/feedbacks')
  @HttpCode(201)
  async execute(@Body() data: ICreateFeedback) {
    return await this.createFeedbackUseCase.execute(data);
  }
}

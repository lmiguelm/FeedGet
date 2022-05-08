import { CreateFeedbackUseCase } from './create-feedback-use-case';

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

describe('Create feedback', () => {
  let createFeedbackService: CreateFeedbackUseCase;

  beforeAll(async () => {
    createFeedbackService = new CreateFeedbackUseCase(
      { create: createFeedbackSpy },
      { sendMail: sendMailSpy },
    );
  });

  it('should be able to submit a feedback', async () => {
    await expect(
      createFeedbackService.execute({
        type: 'BUG',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,saodkaoisjkd',
      }),
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toBeCalled();
    expect(sendMailSpy).toBeCalled();
  });

  it('should not be able to sumbmit feedback without type', async () => {
    await expect(
      createFeedbackService.execute({
        type: '',
        comment: 'example comment',
        screenshot: 'data:image/png;base64,saodkaoisjkd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to sumbmit feedback without comment', async () => {
    await expect(
      createFeedbackService.execute({
        type: 'BUG',
        comment: '',
        screenshot: 'data:image/png;base64,saodkaoisjkd',
      }),
    ).rejects.toThrow();
  });

  it('should not be able to sumbmit feedback with invalid screenshot', async () => {
    await expect(
      createFeedbackService.execute({
        type: 'BUG',
        comment: 'Ta tudo bugado',
        screenshot: 'teste.jpg',
      }),
    ).rejects.toThrow();
  });
});

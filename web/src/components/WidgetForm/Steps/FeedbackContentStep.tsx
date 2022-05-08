import { ArrowLeft, Camera } from 'phosphor-react';
import { FormEvent, useState } from 'react';

import { FeedbackType, feedbackTypes } from '..';
import { api } from '../../../lib/api';
import { CloseButton } from '../../CloseButton';
import { ScreenshotButton } from '../ScreenshotButton';

interface FeedbackContentStepParams {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void;
  onFeedbackSent: () => void;
}

export function FeedbackContentStep({
  feedbackType,
  onFeedbackRestartRequested,
  onFeedbackSent,
}: FeedbackContentStepParams) {
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [comment, setComment] = useState('');

  const feedback = feedbackTypes[feedbackType];

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post('/feedbacks', {
        type: feedback.title,
        comment,
        screenshot,
      });
      onFeedbackSent();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <header>
        <button
          className="top-5 left-5 absolute text-zinc-400 hover:text-zinc-100 transition-all"
          type="button"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft />
        </button>

        <span className="flex items-center gap-2 text-xl leading-6">
          <img className="w-6 h-6" src={feedback.image.source} alt={feedback.image.alt} />

          {feedback.title}
        </span>

        <CloseButton />
      </header>

      <form onSubmit={handleSubmit} className="my-4 w-full">
        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="min-w-[304px] w-full min-h-[112px] text-sm placheolder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 resize-none focus:outline-none scrollbar scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin transition-colors"
          placeholder="Conte com detalhes o que está acontecendo"
        />

        <footer className="flex mt-2 gap-2">
          <ScreenshotButton screenshot={screenshot} onScreenshotTook={setScreenshot} />

          <button
            type="submit"
            disabled={comment.trim().length === 0}
            className="p-2 bg-brand-500 rounded-md border-transparent flex-1 justify-center items-center text-sm hover:bg-brand-300 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-brand-500"
          >
            Enviar feedback
          </button>
        </footer>
      </form>
    </>
  );
}

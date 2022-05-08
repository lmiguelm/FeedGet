export interface FeedbackCreateData {
  type: string;
  comment: string;
  screenshot?: string;
}

export interface IFeedbackRepository {
  create: (data: FeedbackCreateData) => Promise<void>;
}

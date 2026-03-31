export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
  estimateLink: string;
}

export interface EmailService {
  send(payload: EmailPayload): Promise<{ success: boolean; providerMessage: string }>;
}

export class MockEmailService implements EmailService {
  async send(payload: EmailPayload) {
    const hasMinimum = payload.to.length > 3 && payload.subject.length > 1;
    return {
      success: hasMinimum,
      providerMessage: hasMinimum ? 'queued(mock)' : 'validation_failed(mock)',
    };
  }
}

export const emailService: EmailService = new MockEmailService();

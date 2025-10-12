import { Resend } from 'resend';

// Lazy initialization to avoid issues during build time
let resendInstance: Resend | null = null;

/**
 * Get Resend client instance
 * Uses lazy initialization to ensure environment variables are available at runtime
 */
function getResendClient(): Resend {
  if (!resendInstance) {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.error('[Resend] RESEND_API_KEY is not configured');
      throw new Error(
        'RESEND_API_KEY is not configured. Please set it in your environment variables.'
      );
    }

    console.log('[Resend] Resend client initialized successfully');
    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

// Email configuration
export const EMAIL_CONFIG = {
  // Use verified domain for all emails
  from: 'LeanUp <noreply@leanup.kr>',
  adminEmail: (process.env.ADMIN_EMAIL || 'contact@leanup.kr').trim(),
} as const;

export default getResendClient;

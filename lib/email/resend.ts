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
      throw new Error(
        'RESEND_API_KEY is not configured. Please set it in your environment variables.'
      );
    }

    resendInstance = new Resend(apiKey);
  }

  return resendInstance;
}

// Email configuration
export const EMAIL_CONFIG = {
  // Use Resend's onboarding domain for development/testing
  // Switch to your verified domain (noreply@leanup.kr) after domain verification
  from: process.env.NODE_ENV === 'production' && process.env.EMAIL_DOMAIN_VERIFIED === 'true'
    ? 'LeanUP <noreply@leanup.kr>'
    : 'LeanUP <onboarding@resend.dev>',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@leanup.kr',
} as const;

export default getResendClient;

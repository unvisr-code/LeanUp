import { render } from '@react-email/components';
import resend, { EMAIL_CONFIG } from './resend';
import CustomerConfirmationEmail from '@/emails/customer-confirmation';
import AdminNotificationEmail from '@/emails/admin-notification';

interface LeadData {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  industry?: string | null;
  budget?: string | null;
  timeline?: string | null;
  requirements?: string | null;
  reference_url?: string | null;
  include_data_module: boolean;
  include_maintenance_module: boolean;
}

interface EmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send confirmation email to customer
 */
export async function sendCustomerConfirmationEmail(
  leadData: LeadData
): Promise<EmailResult> {
  try {
    const emailHtml = await render(
      CustomerConfirmationEmail({
        name: leadData.name,
        email: leadData.email,
        company: leadData.company || undefined,
        budget: leadData.budget || undefined,
        timeline: leadData.timeline || undefined,
        requirements: leadData.requirements || undefined,
      })
    );

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: leadData.email,
      subject: `문의 접수 완료 - ${leadData.name}님의 문의가 접수되었습니다`,
      html: emailHtml,
    });

    if (error) {
      console.error('Customer email error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error('Send customer email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send notification email to admin
 */
export async function sendAdminNotificationEmail(
  leadData: LeadData,
  priority: 'high' | 'medium' | 'low',
  score: number
): Promise<EmailResult> {
  try {
    const emailHtml = await render(
      AdminNotificationEmail({
        leadId: leadData.id,
        name: leadData.name,
        email: leadData.email,
        phone: leadData.phone || undefined,
        company: leadData.company || undefined,
        industry: leadData.industry || undefined,
        budget: leadData.budget || undefined,
        timeline: leadData.timeline || undefined,
        requirements: leadData.requirements || undefined,
        referenceUrl: leadData.reference_url || undefined,
        includeDataModule: leadData.include_data_module,
        includeMaintenanceModule: leadData.include_maintenance_module,
        priority,
        score,
      })
    );

    const priorityEmojis = {
      high: '🔥',
      medium: '⚡',
      low: '📝',
    };

    const { data, error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      subject: `${priorityEmojis[priority]} 새로운 문의 - ${leadData.name}님 (${leadData.company || '개인'})`,
      html: emailHtml,
    });

    if (error) {
      console.error('Admin email error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: true,
      messageId: data?.id,
    };
  } catch (error) {
    console.error('Send admin email error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send both customer and admin emails
 * Note: Sends emails sequentially to avoid Resend rate limits (2 requests/second)
 */
export async function sendLeadEmails(
  leadData: LeadData,
  priority: 'high' | 'medium' | 'low',
  score: number
): Promise<{
  customerEmail: EmailResult;
  adminEmail: EmailResult;
}> {
  // Send customer email first
  const customerEmail = await sendCustomerConfirmationEmail(leadData);

  // Add a small delay to avoid rate limiting (Resend: 2 requests/second)
  await new Promise(resolve => setTimeout(resolve, 600));

  // Send admin email
  const adminEmail = await sendAdminNotificationEmail(leadData, priority, score);

  return {
    customerEmail,
    adminEmail,
  };
}

/**
 * Slack Notification Module
 *
 * Sends rich-formatted notifications to Slack channel when new leads are created
 */

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

interface SlackNotificationResult {
  success: boolean;
  error?: string;
}

const budgetLabels: Record<string, string> = {
  'under-500': '500만원 미만',
  '500-1000': '500만원 ~ 1,000만원',
  '1000-3000': '1,000만원 ~ 3,000만원',
  '3000-5000': '3,000만원 ~ 5,000만원',
  'over-5000': '5,000만원 이상',
};

const timelineLabels: Record<string, string> = {
  'asap': '최대한 빠르게',
  '1month': '1개월 이내',
  '2month': '2개월 이내',
  '3month': '3개월 이내',
  'over-3month': '3개월 이후',
};

/**
 * Send Slack notification for new lead
 */
export async function sendSlackNotification(
  leadData: LeadData
): Promise<SlackNotificationResult> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  // Skip if Slack webhook is not configured
  if (!webhookUrl) {
    console.log('Slack webhook not configured, skipping notification');
    return { success: true };
  }

  try {
    // Build Slack message with blocks for rich formatting
    const message = {
      text: `새로운 문의 - ${leadData.name}님 (${leadData.company || '개인'})`,
      blocks: [
        {
          type: 'header',
          text: {
            type: 'plain_text',
            text: `🔔 새로운 문의가 접수되었습니다`,
            emoji: true,
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*Lead ID:*\n\`${leadData.id}\``,
            },
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*👤 고객 정보*',
          },
        },
        {
          type: 'section',
          fields: [
            {
              type: 'mrkdwn',
              text: `*이름:*\n${leadData.name}`,
            },
            {
              type: 'mrkdwn',
              text: `*이메일:*\n${leadData.email}`,
            },
            ...(leadData.phone ? [{
              type: 'mrkdwn' as const,
              text: `*연락처:*\n${leadData.phone}`,
            }] : []),
            ...(leadData.company ? [{
              type: 'mrkdwn' as const,
              text: `*회사명:*\n${leadData.company}`,
            }] : []),
            ...(leadData.industry ? [{
              type: 'mrkdwn' as const,
              text: `*업종:*\n${leadData.industry}`,
            }] : []),
          ],
        },
        {
          type: 'divider',
        },
        {
          type: 'section',
          text: {
            type: 'mrkdwn',
            text: '*💰 프로젝트 정보*',
          },
        },
        {
          type: 'section',
          fields: [
            ...(leadData.budget ? [{
              type: 'mrkdwn' as const,
              text: `*예산:*\n${budgetLabels[leadData.budget] || leadData.budget}`,
            }] : []),
            ...(leadData.timeline ? [{
              type: 'mrkdwn' as const,
              text: `*희망 일정:*\n${timelineLabels[leadData.timeline] || leadData.timeline}`,
            }] : []),
            {
              type: 'mrkdwn',
              text: `*데이터 관리 모듈:*\n${leadData.include_data_module ? '✅ 포함' : '❌ 미포함'}`,
            },
            {
              type: 'mrkdwn',
              text: `*유지보수 모듈:*\n${leadData.include_maintenance_module ? '✅ 포함' : '❌ 미포함'}`,
            },
          ],
        },
        ...(leadData.requirements ? [
          {
            type: 'divider' as const,
          },
          {
            type: 'section' as const,
            text: {
              type: 'mrkdwn' as const,
              text: '*📝 요구사항*',
            },
          },
          {
            type: 'section' as const,
            text: {
              type: 'mrkdwn' as const,
              text: `\`\`\`${leadData.requirements}\`\`\``,
            },
          },
        ] : []),
        ...(leadData.reference_url ? [
          {
            type: 'section' as const,
            text: {
              type: 'mrkdwn' as const,
              text: `*🔗 참고 URL:*\n<${leadData.reference_url}|${leadData.reference_url}>`,
            },
          },
        ] : []),
        {
          type: 'divider',
        },
        {
          type: 'context',
          elements: [
            {
              type: 'mrkdwn',
              text: `⏰ ${new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' })} | 신속한 응대를 부탁드립니다! 🚀`,
            },
          ],
        },
      ],
    };

    // Send to Slack
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Slack notification error:', errorText);
      return {
        success: false,
        error: `Slack API returned ${response.status}: ${errorText}`,
      };
    }

    console.log('Slack notification sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Send Slack notification error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

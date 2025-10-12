import * as React from 'react';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface AdminNotificationEmailProps {
  leadId: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  industry?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
  referenceUrl?: string;
  includeDataModule: boolean;
  includeMaintenanceModule: boolean;
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

export default function AdminNotificationEmail({
  leadId,
  name,
  email,
  phone,
  company,
  industry,
  budget,
  timeline,
  requirements,
  referenceUrl,
  includeDataModule,
  includeMaintenanceModule,
}: AdminNotificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>🔔 새로운 문의 - {name}님 ({company || '개인'})</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>🔔 새로운 문의가 접수되었습니다</Heading>

          <Section style={infoBox}>
            <Text style={sectionTitle}>👤 고객 정보</Text>
            <Hr style={hr} />

            <Text style={infoItem}>
              <strong>이름:</strong> {name}
            </Text>
            <Text style={infoItem}>
              <strong>이메일:</strong> <Link href={`mailto:${email}`} style={link}>{email}</Link>
            </Text>
            {phone && (
              <Text style={infoItem}>
                <strong>연락처:</strong> <Link href={`tel:${phone}`} style={link}>{phone}</Link>
              </Text>
            )}
            {company && (
              <Text style={infoItem}>
                <strong>회사명:</strong> {company}
              </Text>
            )}
            {industry && (
              <Text style={infoItem}>
                <strong>업종:</strong> {industry}
              </Text>
            )}
          </Section>

          <Section style={infoBox}>
            <Text style={sectionTitle}>💰 프로젝트 정보</Text>
            <Hr style={hr} />

            {budget && (
              <Text style={infoItem}>
                <strong>예산:</strong> {budgetLabels[budget] || budget}
              </Text>
            )}
            {timeline && (
              <Text style={infoItem}>
                <strong>희망 일정:</strong> {timelineLabels[timeline] || timeline}
              </Text>
            )}
          </Section>

          {requirements && (
            <Section style={infoBox}>
              <Text style={sectionTitle}>📝 요구사항</Text>
              <Hr style={hr} />
              <Text style={requirementsText}>{requirements}</Text>
            </Section>
          )}

          {referenceUrl && (
            <Section style={infoBox}>
              <Text style={sectionTitle}>🔗 참고 URL</Text>
              <Hr style={hr} />
              <Link href={referenceUrl} style={link}>{referenceUrl}</Link>
            </Section>
          )}

          <Section style={actionBox}>
            <Text style={actionText}>
              Lead ID: <code style={codeStyle}>{leadId}</code>
            </Text>
            <Text style={actionText}>
              신속한 응대를 부탁드립니다! 🚀
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            LeanUP Admin System<br />
            자동 발송된 메일입니다.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0 40px',
};

const infoBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
};

const sectionTitle = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px 0',
};

const infoItem = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
};

const moduleList = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  paddingLeft: '20px',
};

const requirementsText = {
  color: '#555',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  padding: '12px',
  backgroundColor: '#fff',
  borderRadius: '4px',
  whiteSpace: 'pre-wrap' as const,
};

const actionBox = {
  backgroundColor: '#eff6ff',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
  border: '2px solid #3b82f6',
};

const actionText = {
  color: '#333',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '8px 0',
  textAlign: 'center' as const,
};

const codeStyle = {
  backgroundColor: '#e5e7eb',
  padding: '2px 6px',
  borderRadius: '4px',
  fontFamily: 'monospace',
  fontSize: '13px',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '24px 40px',
  textAlign: 'center' as const,
};

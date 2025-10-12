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
} from '@react-email/components';

interface CustomerConfirmationEmailProps {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  timeline?: string;
  requirements?: string;
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

export default function CustomerConfirmationEmail({
  name,
  email,
  company,
  budget,
  timeline,
  requirements,
}: CustomerConfirmationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>LeanUP 문의 접수 완료 - {name}님의 문의가 접수되었습니다</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>문의 접수 완료</Heading>

          <Text style={text}>
            안녕하세요, <strong>{name}</strong>님!
          </Text>

          <Text style={text}>
            LeanUP에 문의해 주셔서 감사합니다. 고객님의 문의가 성공적으로 접수되었습니다.
          </Text>

          <Section style={infoBox}>
            <Text style={infoTitle}>접수된 정보</Text>
            <Hr style={hr} />

            <Text style={infoItem}>
              <strong>이름:</strong> {name}
            </Text>
            <Text style={infoItem}>
              <strong>이메일:</strong> {email}
            </Text>
            {company && (
              <Text style={infoItem}>
                <strong>회사명:</strong> {company}
              </Text>
            )}
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
            {requirements && (
              <>
                <Text style={infoItem}>
                  <strong>요구사항:</strong>
                </Text>
                <Text style={requirementsText}>{requirements}</Text>
              </>
            )}
          </Section>

          <Text style={text}>
            담당자가 검토 후 <strong>영업일 기준 1-2일 이내</strong>에 연락드리겠습니다.
          </Text>

          <Text style={text}>
            추가 문의사항이 있으시면 언제든지 회신해 주세요.
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            LeanUP<br />
            이메일: {process.env.ADMIN_EMAIL || 'admin@leanup.kr'}<br />
            본 메일은 발신 전용입니다. 문의사항은 위 이메일로 연락해 주세요.
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

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 40px',
};

const infoBox = {
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  margin: '24px 40px',
  padding: '24px',
};

const infoTitle = {
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

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 0',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '24px 40px',
};

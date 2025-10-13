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
  Button,
  Row,
  Column,
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
      <Preview>LEANUP 문의 접수 완료 - {name}님의 문의가 접수되었습니다</Preview>
      <Body style={main}>
        {/* Gradient Header */}
        <Section style={headerSection}>
          <Container style={headerContainer}>
            <Text style={logoText}>LEANUP</Text>
          </Container>
        </Section>

        <Container style={container}>
          {/* Success Badge */}
          <Section style={successBadge}>
            <div style={checkmarkCircle}>
              <Text style={checkmark}>✓</Text>
            </div>
            <Heading style={h1}>문의 접수 완료</Heading>
            <Text style={subtitle}>
              고객님의 문의를 성공적으로 접수했습니다
            </Text>
          </Section>

          {/* Greeting */}
          <Section style={greetingSection}>
            <Text style={greetingText}>
              안녕하세요, <span style={highlightName}>{name}</span>님!
            </Text>
            <Text style={text}>
              LEANUP에 문의해 주셔서 감사합니다. 전문 담당자가 신속하게 검토하여 최적의 솔루션을 제안해 드리겠습니다.
            </Text>
          </Section>

          {/* Info Cards */}
          <Section style={infoBox}>
            <Text style={infoTitle}>📋 접수된 정보</Text>

            <Row style={infoRow}>
              <Column style={infoColumn}>
                <Text style={infoLabel}>👤 이름</Text>
                <Text style={infoValue}>{name}</Text>
              </Column>
              <Column style={infoColumn}>
                <Text style={infoLabel}>📧 이메일</Text>
                <Text style={infoValue}>{email}</Text>
              </Column>
            </Row>

            {(company || budget) && (
              <Row style={infoRow}>
                {company && (
                  <Column style={infoColumn}>
                    <Text style={infoLabel}>🏢 회사명</Text>
                    <Text style={infoValue}>{company}</Text>
                  </Column>
                )}
                {budget && (
                  <Column style={infoColumn}>
                    <Text style={infoLabel}>💰 예산</Text>
                    <Text style={infoValue}>{budgetLabels[budget] || budget}</Text>
                  </Column>
                )}
              </Row>
            )}

            {timeline && (
              <Row style={infoRow}>
                <Column style={infoColumn}>
                  <Text style={infoLabel}>📅 희망 일정</Text>
                  <Text style={infoValue}>{timelineLabels[timeline] || timeline}</Text>
                </Column>
              </Row>
            )}

            {requirements && (
              <Section style={requirementsSection}>
                <Text style={infoLabel}>📝 요구사항</Text>
                <Text style={requirementsText}>{requirements}</Text>
              </Section>
            )}
          </Section>

          {/* Timeline Section */}
          <Section style={timelineSection}>
            <Text style={timelineTitle}>⏱️ 다음 단계</Text>
            <Section style={timelineCard}>
              <Row>
                <Column style={timelineIconColumn}>
                  <div style={timelineIcon}>1</div>
                </Column>
                <Column style={timelineContent}>
                  <Text style={timelineStepTitle}>담당자 배정 및 검토</Text>
                  <Text style={timelineStepDesc}>전문가가 요구사항을 상세히 분석합니다</Text>
                </Column>
              </Row>
            </Section>
            <Section style={timelineCard}>
              <Row>
                <Column style={timelineIconColumn}>
                  <div style={timelineIcon}>2</div>
                </Column>
                <Column style={timelineContent}>
                  <Text style={timelineStepTitle}>맞춤 제안서 작성</Text>
                  <Text style={timelineStepDesc}>프로젝트에 최적화된 솔루션을 준비합니다</Text>
                </Column>
              </Row>
            </Section>
            <Section style={timelineCard}>
              <Row>
                <Column style={timelineIconColumn}>
                  <div style={timelineIconActive}>3</div>
                </Column>
                <Column style={timelineContent}>
                  <Text style={timelineStepTitle}>영업일 기준 1-2일 이내 연락</Text>
                  <Text style={timelineStepDesc}>이메일 또는 전화로 상세 내용을 안내해 드립니다</Text>
                </Column>
              </Row>
            </Section>
          </Section>

          {/* CTA Section */}
          <Section style={ctaSection}>
            <Text style={ctaText}>
              추가 문의사항이 있으시면 언제든지 연락해 주세요
            </Text>
            <Button style={ctaButton} href={`mailto:${process.env.ADMIN_EMAIL || 'contact@leanup.kr'}`}>
              문의하기
            </Button>
          </Section>

          <Hr style={divider} />

          {/* Footer */}
          <Section style={footerSection}>
            <Text style={footerBrand}>LEANUP</Text>
            <Text style={footer}>
              웹사이트 제작 + 데이터 추적 + 온보딩까지
            </Text>
            <Text style={footerContact}>
              📧 {process.env.ADMIN_EMAIL || 'contact@leanup.kr'}
            </Text>
            <Text style={footerNote}>
              본 메일은 발신 전용입니다. 문의사항은 위 이메일로 연락해 주세요.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Modern Color System
const colors = {
  primary: '#3b82f6',
  primaryDark: '#2563eb',
  secondary: '#10b981',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  gradientAlt: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  success: '#10b981',
  background: '#f8fafc',
  surface: '#ffffff',
  surfaceAlt: '#f1f5f9',
  textPrimary: '#0f172a',
  textSecondary: '#475569',
  textMuted: '#94a3b8',
  border: '#e2e8f0',
  shadow: 'rgba(0, 0, 0, 0.08)',
};

// Main Styles
const main = {
  backgroundColor: colors.background,
  fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", "Noto Sans KR", sans-serif',
  WebkitFontSmoothing: 'antialiased' as const,
  MozOsxFontSmoothing: 'grayscale' as const,
};

// Gradient Header
const headerSection = {
  background: colors.gradient,
  padding: '0',
  margin: '0',
};

const headerContainer = {
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const logoText = {
  fontSize: '28px',
  fontWeight: '800',
  color: '#ffffff',
  margin: '0',
  letterSpacing: '-0.5px',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
};

// Container
const container = {
  backgroundColor: colors.surface,
  margin: '0 auto',
  padding: '0',
  maxWidth: '600px',
  borderRadius: '0 0 16px 16px',
  overflow: 'hidden' as const,
};

// Success Badge
const successBadge = {
  textAlign: 'center' as const,
  padding: '48px 24px 32px',
};

const checkmarkCircle = {
  width: '64px',
  height: '64px',
  borderRadius: '50%',
  background: colors.gradient,
  margin: '0 auto 24px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: `0 10px 25px ${colors.shadow}`,
};

const checkmark = {
  fontSize: '32px',
  fontWeight: 'bold',
  color: '#ffffff',
  margin: '0',
  lineHeight: '1',
};

// Typography
const h1 = {
  color: colors.textPrimary,
  fontSize: '32px',
  fontWeight: '800',
  margin: '0 0 12px 0',
  letterSpacing: '-0.5px',
  lineHeight: '1.2',
};

const subtitle = {
  color: colors.textSecondary,
  fontSize: '16px',
  fontWeight: '500',
  margin: '0',
  lineHeight: '1.5',
};

const greetingSection = {
  padding: '0 32px',
  margin: '32px 0',
};

const greetingText = {
  color: colors.textPrimary,
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  lineHeight: '1.5',
};

const highlightName = {
  background: colors.gradient,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  fontWeight: '700',
};

const text = {
  color: colors.textSecondary,
  fontSize: '15px',
  lineHeight: '1.6',
  margin: '0',
};

// Info Box
const infoBox = {
  backgroundColor: colors.surfaceAlt,
  borderRadius: '16px',
  margin: '32px 24px',
  padding: '28px',
  border: `1px solid ${colors.border}`,
  boxShadow: `0 4px 12px ${colors.shadow}`,
};

const infoTitle = {
  color: colors.textPrimary,
  fontSize: '18px',
  fontWeight: '700',
  margin: '0 0 20px 0',
  letterSpacing: '-0.3px',
};

const infoRow = {
  marginBottom: '16px',
};

const infoColumn = {
  padding: '12px',
  backgroundColor: colors.surface,
  borderRadius: '12px',
  margin: '4px',
  verticalAlign: 'top' as const,
};

const infoLabel = {
  color: colors.textMuted,
  fontSize: '13px',
  fontWeight: '600',
  margin: '0 0 6px 0',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const infoValue = {
  color: colors.textPrimary,
  fontSize: '15px',
  fontWeight: '600',
  margin: '0',
  lineHeight: '1.4',
};

const requirementsSection = {
  marginTop: '16px',
  padding: '16px',
  backgroundColor: colors.surface,
  borderRadius: '12px',
};

const requirementsText = {
  color: colors.textSecondary,
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '8px 0 0 0',
  whiteSpace: 'pre-wrap' as const,
};

// Timeline Section
const timelineSection = {
  padding: '32px 24px',
  margin: '0',
};

const timelineTitle = {
  color: colors.textPrimary,
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 24px 0',
  letterSpacing: '-0.3px',
};

const timelineCard = {
  backgroundColor: colors.surface,
  borderRadius: '12px',
  padding: '16px',
  marginBottom: '12px',
  border: `1px solid ${colors.border}`,
  boxShadow: `0 2px 8px ${colors.shadow}`,
};

const timelineIconColumn = {
  width: '48px',
  verticalAlign: 'top' as const,
};

const timelineIcon = {
  width: '36px',
  height: '36px',
  borderRadius: '50%',
  backgroundColor: colors.surfaceAlt,
  color: colors.textSecondary,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  fontWeight: '700',
  border: `2px solid ${colors.border}`,
  margin: '0',
};

const timelineIconActive = {
  ...timelineIcon,
  background: colors.gradient,
  color: '#ffffff',
  border: 'none',
  boxShadow: `0 4px 12px ${colors.shadow}`,
};

const timelineContent = {
  verticalAlign: 'top' as const,
  paddingLeft: '12px',
};

const timelineStepTitle = {
  color: colors.textPrimary,
  fontSize: '15px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  lineHeight: '1.4',
};

const timelineStepDesc = {
  color: colors.textSecondary,
  fontSize: '13px',
  margin: '0',
  lineHeight: '1.5',
};

// CTA Section
const ctaSection = {
  textAlign: 'center' as const,
  padding: '32px 24px',
  margin: '0',
};

const ctaText = {
  color: colors.textSecondary,
  fontSize: '15px',
  margin: '0 0 20px 0',
  lineHeight: '1.5',
};

const ctaButton = {
  backgroundColor: colors.primary,
  background: colors.gradient,
  color: '#ffffff',
  padding: '14px 32px',
  borderRadius: '12px',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '15px',
  display: 'inline-block',
  boxShadow: `0 4px 16px ${colors.shadow}`,
  border: 'none',
  letterSpacing: '0.3px',
};

// Divider
const divider = {
  borderColor: colors.border,
  margin: '0 24px',
  borderWidth: '1px',
  borderStyle: 'solid',
};

// Footer
const footerSection = {
  textAlign: 'center' as const,
  padding: '32px 24px',
};

const footerBrand = {
  fontSize: '20px',
  fontWeight: '700',
  color: colors.textPrimary,
  margin: '0 0 8px 0',
  letterSpacing: '-0.3px',
};

const footer = {
  color: colors.textSecondary,
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
};

const footerContact = {
  color: colors.textSecondary,
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 16px 0',
};

const footerNote = {
  color: colors.textMuted,
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0',
};

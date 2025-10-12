/**
 * Email System Test Script
 *
 * This script tests the email sending functionality to verify:
 * 1. Environment variables are correctly loaded
 * 2. Resend API key is valid
 * 3. Email templates render correctly
 * 4. Email sending works properly
 *
 * Run with: npx tsx scripts/test-email.ts
 */

// IMPORTANT: Load environment variables BEFORE any imports
import { config } from 'dotenv';
import { resolve } from 'path';
config({ path: resolve(process.cwd(), '.env.local') });

// Now import modules that depend on environment variables
import getResendClient, { EMAIL_CONFIG } from '../lib/email/resend';
import { sendLeadEmails } from '../lib/email/send-lead-emails';
import { sendSlackNotification } from '../lib/slack/send-slack-notification';

async function testEmailSystem() {
  console.log('🧪 Testing Email & Slack Notification System...\n');

  // Step 1: Verify environment variables
  console.log('1️⃣ Checking environment variables...');
  console.log(`   ✓ RESEND_API_KEY: ${process.env.RESEND_API_KEY ? '✅ Set' : '❌ Missing'}`);
  console.log(`   ✓ ADMIN_EMAIL: ${process.env.ADMIN_EMAIL || '❌ Missing'}`);
  console.log(`   ✓ EMAIL_DOMAIN_VERIFIED: ${process.env.EMAIL_DOMAIN_VERIFIED || 'false (using onboarding domain)'}`);
  console.log(`   ✓ Email From: ${EMAIL_CONFIG.from}`);
  console.log(`   ✓ SLACK_WEBHOOK_URL: ${process.env.SLACK_WEBHOOK_URL ? '✅ Set' : 'ℹ️  Not set (Slack notifications will be skipped)'}`);
  console.log('');

  if (!process.env.RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY is not set in .env.local');
    process.exit(1);
  }

  // Step 2: Test Resend API connection
  console.log('2️⃣ Testing Resend API connection...');
  try {
    const resend = getResendClient();
    const testResult = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      to: EMAIL_CONFIG.adminEmail,
      subject: 'LeanUP Email System Test',
      html: '<p>This is a test email to verify the email system is working correctly.</p>',
    });

    if (testResult.error) {
      console.error(`   ❌ Failed: ${testResult.error.message}`);
      process.exit(1);
    }

    console.log(`   ✅ Success! Message ID: ${testResult.data?.id}`);
    console.log('');
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    process.exit(1);
  }

  // Wait to avoid rate limiting (2 requests/second)
  console.log('⏳ Waiting 1 second to avoid rate limit...\n');
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Step 3: Test Slack notification (if configured)
  if (process.env.SLACK_WEBHOOK_URL) {
    console.log('3️⃣ Testing Slack notification...');
    const testLeadForSlack = {
      id: 'slack-test-' + Date.now(),
      name: 'Slack Test Customer',
      email: EMAIL_CONFIG.adminEmail,
      phone: '010-1234-5678',
      company: 'Test Company Ltd.',
      industry: 'Technology',
      budget: 'over-5000' as const,
      timeline: 'asap' as const,
      requirements: 'This is a test Slack notification from LeanUP email system test.',
      reference_url: 'https://example.com',
      include_data_module: true,
      include_maintenance_module: true,
    };

    try {
      const slackResult = await sendSlackNotification(testLeadForSlack, 'high', 95);
      if (slackResult.success) {
        console.log('   ✅ Slack notification sent successfully!');
      } else {
        console.error(`   ❌ Failed: ${slackResult.error}`);
      }
      console.log('');
    } catch (error) {
      console.error('   ❌ Error:', error);
    }

    // Wait before sending emails
    await new Promise(resolve => setTimeout(resolve, 1000));
  } else {
    console.log('3️⃣ Skipping Slack test (SLACK_WEBHOOK_URL not set)\n');
  }

  // Step 4: Test full lead email workflow
  console.log('4️⃣ Testing lead email workflow...');
  const testLeadData = {
    id: 'test-' + Date.now(),
    name: 'Test Customer',
    email: EMAIL_CONFIG.adminEmail, // Send test email to admin
    phone: '010-1234-5678',
    company: 'Test Company',
    industry: 'Technology',
    budget: 'over-5000' as const,
    timeline: 'asap' as const,
    requirements: 'This is a test requirement for email system validation.',
    reference_url: 'https://example.com',
    include_data_module: true,
    include_maintenance_module: true,
  };

  try {
    const emailResults = await sendLeadEmails(testLeadData, 'high', 90);

    console.log('   Customer Email:');
    if (emailResults.customerEmail.success) {
      console.log(`   ✅ Sent successfully! Message ID: ${emailResults.customerEmail.messageId}`);
    } else {
      console.error(`   ❌ Failed: ${emailResults.customerEmail.error}`);
    }

    console.log('   Admin Email:');
    if (emailResults.adminEmail.success) {
      console.log(`   ✅ Sent successfully! Message ID: ${emailResults.adminEmail.messageId}`);
    } else {
      console.error(`   ❌ Failed: ${emailResults.adminEmail.error}`);
    }
    console.log('');
  } catch (error) {
    console.error(`   ❌ Error:`, error);
    process.exit(1);
  }

  // Summary
  console.log('✅ Email & Slack Notification Test Complete!');
  console.log('');
  console.log('📧 Check your inbox at:', EMAIL_CONFIG.adminEmail);
  console.log('   You should receive:');
  console.log('   1. A simple test email');
  console.log('   2. A customer confirmation email');
  console.log('   3. An admin notification email');
  console.log('');
  if (process.env.SLACK_WEBHOOK_URL) {
    console.log('💬 Check your Slack channel:');
    console.log('   You should see a test notification with:');
    console.log('   - 🔥 High priority badge');
    console.log('   - Customer and project information');
    console.log('   - Rich formatted message');
    console.log('');
  }
  console.log('🔍 You can also check:');
  console.log('   - Resend Dashboard: https://resend.com/emails');
  if (process.env.SLACK_WEBHOOK_URL) {
    console.log('   - Slack workspace for the notification');
  }
}

// Run the test
testEmailSystem().catch((error) => {
  console.error('💥 Test failed:', error);
  process.exit(1);
});

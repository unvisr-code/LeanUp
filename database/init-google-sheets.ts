/**
 * Initialize Google Sheets for Leads data
 * This script creates the Leads sheet and sets up headers
 */

// Load environment variables FIRST before any other imports
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

// Now import after env vars are loaded
import { createLead, getAllLeads } from '../lib/googlesheets';

async function initGoogleSheets() {
  console.log('🚀 Initializing Google Sheets...\n');

  try {
    // Test: Get all leads (this will create the sheet if it doesn't exist)
    console.log('📋 Setting up Leads sheet...');
    const leads = await getAllLeads();
    console.log(`✅ Leads sheet initialized. Current row count: ${leads.length}\n`);

    // Test: Create a test lead
    console.log('🧪 Creating a test lead...');
    const testLead = await createLead({
      name: 'Test Lead',
      email: 'test@example.com',
      phone: '010-1234-5678',
      company: 'Test Company',
      budget: '1000-3000',
      timeline: '1month',
      requirements: 'This is a test lead for initialization',
      include_data_module: true,
      include_maintenance_module: false,
    });
    console.log('✅ Test lead created:', testLead.id);

    // Verify
    console.log('\n📊 Current leads in sheet:');
    const allLeads = await getAllLeads();
    console.log(`Total leads: ${allLeads.length}`);
    allLeads.forEach((lead, index) => {
      console.log(`  ${index + 1}. ${lead.name} (${lead.email}) - Status: ${lead.status}`);
    });

    console.log('\n✨ Google Sheets initialization complete!');
    console.log('\n🔗 View your sheet at:');
    console.log(`https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEETS_SPREADSHEET_ID}/edit`);
  } catch (error) {
    console.error('❌ Error initializing Google Sheets:', error);
    throw error;
  }
}

// Run initialization
initGoogleSheets()
  .then(() => {
    console.log('\n✅ Success!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed:', error.message);
    process.exit(1);
  });

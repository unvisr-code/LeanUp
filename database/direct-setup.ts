import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

import { supabaseAdmin } from '@/lib/supabase';

async function directSetup() {
  console.log('🚀 Setting up database through direct queries...');

  try {
    // First, let's test if we can connect
    console.log('🧪 Testing connection...');
    const { data, error } = await supabaseAdmin.from('_supabase_migrations').select('*').limit(1);

    if (error && !error.message.includes('relation "_supabase_migrations" does not exist')) {
      console.error('❌ Connection test failed:', error);
      throw error;
    }

    console.log('✅ Connection successful!');

    // Let's try to create a simple test first
    console.log('📝 Creating test table...');

    // Use the SQL editor endpoint
    const createLeadsQuery = `
      CREATE TABLE IF NOT EXISTS public.leads (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(50),
        company VARCHAR(255),
        budget VARCHAR(20),
        timeline VARCHAR(20),
        requirements TEXT,
        reference_url VARCHAR(500),
        industry VARCHAR(255),
        include_data_module BOOLEAN DEFAULT false,
        include_maintenance_module BOOLEAN DEFAULT false,
        status VARCHAR(20) DEFAULT 'pending',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    const createPortfolioQuery = `
      CREATE TABLE IF NOT EXISTS public.portfolio (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tech_stack TEXT[] NOT NULL DEFAULT '{}',
        service_type TEXT[] NOT NULL DEFAULT '{}',
        service_link VARCHAR(500),
        category VARCHAR(20) NOT NULL,
        thumbnail VARCHAR(500),
        detail_link VARCHAR(500),
        features TEXT[],
        work_scope TEXT[],
        is_active BOOLEAN DEFAULT true,
        sort_order INTEGER DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;

    console.log('ℹ️ Manual SQL execution required:');
    console.log('Please run the following SQL in your Supabase SQL editor:');
    console.log('\n--- LEADS TABLE ---');
    console.log(createLeadsQuery);
    console.log('\n--- PORTFOLIO TABLE ---');
    console.log(createPortfolioQuery);

    // Test if tables exist by trying to access them
    console.log('\n🧪 Testing table access...');

    try {
      const { data: leadsTest, error: leadsError } = await supabaseAdmin
        .from('leads')
        .select('*')
        .limit(1);

      if (leadsError) {
        console.log('⚠️ Leads table does not exist yet. Please create it manually.');
      } else {
        console.log('✅ Leads table exists and is accessible!');
      }
    } catch (error) {
      console.log('⚠️ Leads table access test failed - table may not exist');
    }

    try {
      const { data: portfolioTest, error: portfolioError } = await supabaseAdmin
        .from('portfolio')
        .select('*')
        .limit(1);

      if (portfolioError) {
        console.log('⚠️ Portfolio table does not exist yet. Please create it manually.');
      } else {
        console.log('✅ Portfolio table exists and is accessible!');
      }
    } catch (error) {
      console.log('⚠️ Portfolio table access test failed - table may not exist');
    }

  } catch (error) {
    console.error('❌ Setup failed:', error);
  }
}

if (require.main === module) {
  directSetup();
}

export { directSetup };
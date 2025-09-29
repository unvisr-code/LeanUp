import * as dotenv from 'dotenv';

// Load environment variables first
dotenv.config({ path: '.env.local' });

// Now import supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testConnection() {
  console.log('🚀 Testing Supabase connection...');
  console.log('📍 Supabase URL:', supabaseUrl);

  try {
    // Test leads table
    console.log('🧪 Testing leads table...');
    const { data: leadsData, error: leadsError } = await supabase
      .from('leads')
      .select('*')
      .limit(1);

    if (leadsError) {
      console.log('⚠️ Leads table does not exist or is not accessible:', leadsError.message);
      console.log('📝 Please create the leads table manually in Supabase SQL editor');
    } else {
      console.log('✅ Leads table is accessible!');
      console.log('📊 Current leads count:', leadsData.length);
    }

    // Test portfolio table
    console.log('🧪 Testing portfolio table...');
    const { data: portfolioData, error: portfolioError } = await supabase
      .from('portfolio')
      .select('*')
      .limit(1);

    if (portfolioError) {
      console.log('⚠️ Portfolio table does not exist or is not accessible:', portfolioError.message);
      console.log('📝 Please create the portfolio table manually in Supabase SQL editor');
    } else {
      console.log('✅ Portfolio table is accessible!');
      console.log('📊 Current portfolio items count:', portfolioData.length);
    }

    // If both tables don't exist, show SQL
    if (leadsError && portfolioError) {
      console.log('\n📝 Manual table creation required. Please run these SQL commands in your Supabase SQL editor:');

      console.log('\n--- LEADS TABLE ---');
      console.log(`CREATE TABLE IF NOT EXISTS public.leads (
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
);`);

      console.log('\n--- PORTFOLIO TABLE ---');
      console.log(`CREATE TABLE IF NOT EXISTS public.portfolio (
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
);`);

      console.log('\n--- ENABLE ROW LEVEL SECURITY ---');
      console.log(`ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
CREATE POLICY "Enable read access for all users" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.leads
    FOR INSERT WITH CHECK (true);

-- Create policies for portfolio table
CREATE POLICY "Enable read access for all users" ON public.portfolio
    FOR SELECT USING (true);

CREATE POLICY "Enable all operations for service role" ON public.portfolio
    FOR ALL USING (true);`);
    }

    console.log('\n🎉 Connection test completed!');

  } catch (error) {
    console.error('❌ Connection test failed:', error);
  }
}

if (require.main === module) {
  testConnection();
}

export { testConnection };
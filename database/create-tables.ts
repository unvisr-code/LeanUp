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

async function createTables() {
  console.log('🚀 Creating database tables...');
  console.log('📍 Supabase URL:', supabaseUrl);

  try {
    // Test connection by checking existing tables
    console.log('🧪 Testing connection...');
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(1);

    if (error && !error.message.includes('permission denied')) {
      console.error('❌ Connection test failed:', error);
      return;
    }

    console.log('✅ Connection successful!');

    // Create leads table
    console.log('📝 Creating leads table...');
    const { error: leadsError } = await supabase.rpc('exec', {
      sql: `
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
      `
    });

    if (leadsError) {
      console.error('❌ Error creating leads table:', leadsError);
    } else {
      console.log('✅ Leads table created successfully!');
    }

    // Create portfolio table
    console.log('📝 Creating portfolio table...');
    const { error: portfolioError } = await supabase.rpc('exec', {
      sql: `
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
      `
    });

    if (portfolioError) {
      console.error('❌ Error creating portfolio table:', portfolioError);
    } else {
      console.log('✅ Portfolio table created successfully!');
    }

    // Test table access
    console.log('🧪 Testing table access...');

    try {
      const { data: leadsData, error: leadsTestError } = await supabase
        .from('leads')
        .select('*')
        .limit(1);

      if (leadsTestError) {
        console.log('⚠️ Leads table test failed:', leadsTestError.message);
      } else {
        console.log('✅ Leads table is accessible');
      }
    } catch (error) {
      console.log('⚠️ Leads table access test failed');
    }

    try {
      const { data: portfolioData, error: portfolioTestError } = await supabase
        .from('portfolio')
        .select('*')
        .limit(1);

      if (portfolioTestError) {
        console.log('⚠️ Portfolio table test failed:', portfolioTestError.message);
      } else {
        console.log('✅ Portfolio table is accessible');
      }
    } catch (error) {
      console.log('⚠️ Portfolio table access test failed');
    }

    console.log('🎉 Database setup completed!');
    console.log('\n📝 If tables were not created automatically, please run these SQL commands in your Supabase SQL editor:');

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

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

if (require.main === module) {
  createTables();
}

export { createTables };
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Use the database schema directly to create tables
async function autoCreateTables() {
  console.log('🚀 Auto-creating tables...');
  console.log('📍 Supabase URL:', supabaseUrl.substring(0, 30) + '...');

  try {
    // Since we can't execute raw SQL directly, we'll use a different approach
    // Let's try to use the auto-introspection features

    console.log('📝 Testing table creation by trying to use the schema...');

    // Test 1: Try to use a custom function approach
    const customSQL = `
DO $$
BEGIN
    -- Create leads table
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'leads') THEN
        CREATE TABLE public.leads (
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

        ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON public.leads FOR SELECT USING (true);
        CREATE POLICY "Enable insert for all users" ON public.leads FOR INSERT WITH CHECK (true);
    END IF;

    -- Create portfolio table
    IF NOT EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'portfolio') THEN
        CREATE TABLE public.portfolio (
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

        ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;
        CREATE POLICY "Enable read access for all users" ON public.portfolio FOR SELECT USING (true);
        CREATE POLICY "Enable all operations for service role" ON public.portfolio FOR ALL USING (true);
    END IF;
END $$;
`;

    // Let's create a temporary function that we can call
    const createFunctionSQL = `
CREATE OR REPLACE FUNCTION create_initial_tables()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    -- Create leads table
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

    -- Create portfolio table
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

    RETURN 'Tables created successfully';
END $$;
`;

    // Try to create the function
    console.log('📝 Creating helper function...');
    try {
      // Use RPC to try to execute the function creation
      const { data: funcResult, error: funcError } = await supabase
        .rpc('create_initial_tables');

      if (funcError) {
        console.log('⚠️ Function call failed (expected):', funcError.message);

        // Manual table creation via direct insert approach
        console.log('📝 Trying manual table detection...');

        // For leads table - try a simple select to see if it exists
        const { data: leadsCheck, error: leadsCheckError } = await supabase
          .from('leads')
          .select('id')
          .limit(1);

        if (leadsCheckError && leadsCheckError.message.includes('does not exist')) {
          console.log('❌ Leads table needs to be created manually');
        }

        const { data: portfolioCheck, error: portfolioCheckError } = await supabase
          .from('portfolio')
          .select('id')
          .limit(1);

        if (portfolioCheckError && portfolioCheckError.message.includes('does not exist')) {
          console.log('❌ Portfolio table needs to be created manually');
        }
      } else {
        console.log('✅ Function executed successfully:', funcResult);
      }
    } catch (err) {
      console.log('⚠️ Function creation approach failed');
    }

    console.log('\n🎯 Manual Setup Required');
    console.log('Please copy and paste this SQL in your Supabase SQL Editor:');
    console.log('Dashboard > SQL Editor > New query');
    console.log('\n' + '='.repeat(80));

    console.log(`-- STEP 1: Create leads table
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

-- STEP 2: Create portfolio table
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

-- STEP 3: Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- STEP 4: Create Policies
CREATE POLICY "Enable read access for all users" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable read access for all users" ON public.portfolio
    FOR SELECT USING (true);

CREATE POLICY "Enable all operations for service role" ON public.portfolio
    FOR ALL USING (true);`);

    console.log('='.repeat(80));
    console.log('\nAfter running the SQL above, test with: npm run db:test');
    console.log('Then seed data with: npm run db:seed');

  } catch (error) {
    console.error('❌ Auto-creation failed:', error);
  }
}

if (require.main === module) {
  autoCreateTables();
}

export { autoCreateTables };
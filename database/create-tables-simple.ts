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

async function createTablesViaAPI() {
  console.log('🚀 Creating tables via Supabase API...');

  try {
    // Try to create leads table using insert to test structure
    console.log('📝 Attempting to create leads table structure...');

    // We'll use a simple approach - try to insert and then delete to create the table
    const leadsData = {
      name: 'Test User',
      email: 'test@example.com',
      phone: '010-1234-5678',
      company: 'Test Company',
      budget: 'under-500' as const,
      timeline: '1month' as const,
      requirements: 'Test requirements',
      reference_url: 'https://example.com',
      industry: 'Test Industry',
      include_data_module: true,
      include_maintenance_module: false,
      status: 'pending' as const,
    };

    // This will fail if table doesn't exist, which will guide us
    const { data: testLead, error: leadError } = await supabase
      .from('leads')
      .insert(leadsData)
      .select()
      .single();

    if (leadError) {
      console.error('❌ Leads table does not exist:', leadError.message);

      if (leadError.message.includes('relation "public.leads" does not exist')) {
        console.log('📝 Creating leads table using REST API...');

        // Direct HTTP call to Supabase
        const createLeadsResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'apikey': supabaseServiceKey,
          },
          body: JSON.stringify({
            sql: `CREATE TABLE IF NOT EXISTS public.leads (
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
            )`
          })
        });

        if (createLeadsResponse.ok) {
          console.log('✅ Leads table created successfully!');
        } else {
          const errorText = await createLeadsResponse.text();
          console.error('❌ Failed to create leads table:', errorText);
        }
      }
    } else {
      console.log('✅ Leads table already exists!');
      // Clean up test data
      await supabase.from('leads').delete().eq('id', testLead.id);
    }

    // Try portfolio table
    console.log('📝 Attempting to create portfolio table structure...');

    const portfolioData = {
      name: 'Test Portfolio',
      description: 'Test Description',
      tech_stack: ['Test'],
      service_type: ['Test'],
      category: 'web' as const,
      is_active: true,
      sort_order: 0,
    };

    const { data: testPortfolio, error: portfolioError } = await supabase
      .from('portfolio')
      .insert(portfolioData)
      .select()
      .single();

    if (portfolioError) {
      console.error('❌ Portfolio table does not exist:', portfolioError.message);

      if (portfolioError.message.includes('relation "public.portfolio" does not exist')) {
        console.log('📝 Creating portfolio table using REST API...');

        const createPortfolioResponse = await fetch(`${supabaseUrl}/rest/v1/rpc/exec_sql`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseServiceKey}`,
            'apikey': supabaseServiceKey,
          },
          body: JSON.stringify({
            sql: `CREATE TABLE IF NOT EXISTS public.portfolio (
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
            )`
          })
        });

        if (createPortfolioResponse.ok) {
          console.log('✅ Portfolio table created successfully!');
        } else {
          const errorText = await createPortfolioResponse.text();
          console.error('❌ Failed to create portfolio table:', errorText);
        }
      }
    } else {
      console.log('✅ Portfolio table already exists!');
      // Clean up test data
      await supabase.from('portfolio').delete().eq('id', testPortfolio.id);
    }

    console.log('🎉 Table creation process completed!');

  } catch (error) {
    console.error('❌ Error in table creation:', error);
  }
}

if (require.main === module) {
  createTablesViaAPI();
}

export { createTablesViaAPI };
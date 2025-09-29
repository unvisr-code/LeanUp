import { supabaseAdmin } from '@/lib/supabase';

async function setupDatabase() {
  console.log('🚀 Setting up database tables...');

  try {
    // Create leads table
    console.log('📝 Creating leads table...');
    const { error: leadsError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS leads (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(255),
          budget VARCHAR(20) CHECK (budget IN ('under-500', '500-1000', '1000-3000', '3000-5000', 'over-5000')),
          timeline VARCHAR(20) CHECK (timeline IN ('asap', '1month', '2month', '3month', 'over-3month')),
          requirements TEXT,
          reference_url VARCHAR(500),
          industry VARCHAR(255),
          include_data_module BOOLEAN DEFAULT false,
          include_maintenance_module BOOLEAN DEFAULT false,
          status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'quoted', 'closed', 'rejected')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (leadsError && !leadsError.message.includes('already exists')) {
      console.error('❌ Error creating leads table:', leadsError);
      throw leadsError;
    }

    console.log('✅ Leads table created successfully!');

    // Create portfolio table
    console.log('📝 Creating portfolio table...');
    const { error: portfolioError } = await supabaseAdmin.rpc('exec_sql', {
      sql: `
        CREATE TABLE IF NOT EXISTS portfolio (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          tech_stack TEXT[] NOT NULL DEFAULT '{}',
          service_type TEXT[] NOT NULL DEFAULT '{}',
          service_link VARCHAR(500),
          category VARCHAR(20) NOT NULL CHECK (category IN ('web', 'app', 'landing')),
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

    if (portfolioError && !portfolioError.message.includes('already exists')) {
      console.error('❌ Error creating portfolio table:', portfolioError);
      throw portfolioError;
    }

    console.log('✅ Portfolio table created successfully!');

    // Test the tables
    console.log('🧪 Testing table access...');

    const { data: leadsCount, error: leadsCountError } = await supabaseAdmin
      .from('leads')
      .select('*', { count: 'exact', head: true });

    const { data: portfolioCount, error: portfolioCountError } = await supabaseAdmin
      .from('portfolio')
      .select('*', { count: 'exact', head: true });

    if (leadsCountError) {
      console.error('❌ Error accessing leads table:', leadsCountError);
    } else {
      console.log('✅ Leads table accessible');
    }

    if (portfolioCountError) {
      console.error('❌ Error accessing portfolio table:', portfolioCountError);
    } else {
      console.log('✅ Portfolio table accessible');
    }

    console.log('🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDatabase();
}

export { setupDatabase };
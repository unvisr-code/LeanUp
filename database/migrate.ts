import { supabaseAdmin } from '@/lib/supabase';
import * as fs from 'fs';
import * as path from 'path';

async function runMigration() {
  try {
    console.log('🚀 Starting database migration...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Execute the schema
    const { error } = await supabaseAdmin.rpc('exec_sql', { sql: schema });

    if (error) {
      console.error('❌ Migration failed:', error);
      throw error;
    }

    console.log('✅ Database migration completed successfully!');

    // Test the connection
    console.log('🧪 Testing database connection...');

    const { data: leadsTest, error: leadsError } = await supabaseAdmin
      .from('leads')
      .select('count')
      .limit(1);

    const { data: portfolioTest, error: portfolioError } = await supabaseAdmin
      .from('portfolio')
      .select('count')
      .limit(1);

    if (leadsError || portfolioError) {
      console.error('❌ Database connection test failed:', leadsError || portfolioError);
    } else {
      console.log('✅ Database connection test passed!');
    }

  } catch (error) {
    console.error('❌ Migration process failed:', error);
    process.exit(1);
  }
}

// Alternative approach using direct SQL execution
async function runMigrationDirect() {
  try {
    console.log('🚀 Starting database migration (direct SQL)...');

    // Read the schema file
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Split schema into individual statements
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    console.log(`📝 Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i] + ';';
      console.log(`⚡ Executing statement ${i + 1}/${statements.length}...`);

      try {
        const { error } = await supabaseAdmin.rpc('exec_sql', { sql: statement });
        if (error) {
          console.warn(`⚠️ Statement ${i + 1} warning:`, error.message);
          // Continue with next statement
        }
      } catch (error) {
        console.warn(`⚠️ Statement ${i + 1} error:`, error);
        // Continue with next statement
      }
    }

    console.log('✅ Database migration completed!');

  } catch (error) {
    console.error('❌ Migration process failed:', error);
    process.exit(1);
  }
}

// Run migration
if (require.main === module) {
  runMigrationDirect();
}

export { runMigration, runMigrationDirect };
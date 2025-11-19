import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

// Lazy environment variable validation
function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    console.error(`[Google Sheets] ${name} is not configured`);
    throw new Error(`${name} is required`);
  }
  return value;
}

// Lead types (matching Supabase schema)
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  budget: 'under-500' | '500-1000' | '1000-3000' | '3000-5000' | 'over-5000' | null;
  timeline: 'asap' | '1month' | '2month' | '3month' | 'over-3month' | null;
  requirements: string | null;
  reference_url: string | null;
  industry: string | null;
  include_data_module: boolean;
  include_maintenance_module: boolean;
  status: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface LeadInsert {
  id?: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  budget?: 'under-500' | '500-1000' | '1000-3000' | '3000-5000' | 'over-5000' | null;
  timeline?: 'asap' | '1month' | '2month' | '3month' | 'over-3month' | null;
  requirements?: string | null;
  reference_url?: string | null;
  industry?: string | null;
  include_data_module?: boolean;
  include_maintenance_module?: boolean;
  status?: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected';
  created_at?: string;
  updated_at?: string;
}

export interface LeadUpdate {
  status?: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected';
  updated_at?: string;
}

// Sheet configuration
const SHEET_NAME = 'Leads';
const HEADERS = [
  'id',
  'name',
  'email',
  'phone',
  'company',
  'budget',
  'timeline',
  'requirements',
  'reference_url',
  'industry',
  'include_data_module',
  'include_maintenance_module',
  'status',
  'created_at',
  'updated_at'
];

// Initialize Google Sheets client
async function getGoogleSheetDoc() {
  const SPREADSHEET_ID = getEnvVar('GOOGLE_SHEETS_SPREADSHEET_ID');
  const SERVICE_ACCOUNT_EMAIL = getEnvVar('GOOGLE_SERVICE_ACCOUNT_EMAIL');
  let PRIVATE_KEY = getEnvVar('GOOGLE_PRIVATE_KEY');

  // Check if private key is base64 encoded (doesn't start with -----)
  if (!PRIVATE_KEY.startsWith('-----BEGIN')) {
    // Decode from base64
    PRIVATE_KEY = Buffer.from(PRIVATE_KEY, 'base64').toString('utf-8');
  } else {
    // Replace escaped newlines with actual newlines
    PRIVATE_KEY = PRIVATE_KEY.replace(/\\n/g, '\n');
  }

  const serviceAccountAuth = new JWT({
    email: SERVICE_ACCOUNT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);
  await doc.loadInfo();

  console.log('[Google Sheets] Google Sheets client initialized successfully');
  return doc;
}

// Get or create the Leads sheet
async function getLeadsSheet() {
  const doc = await getGoogleSheetDoc();

  // Try to find existing sheet
  let sheet = doc.sheetsByTitle[SHEET_NAME];

  // If sheet doesn't exist, create it
  if (!sheet) {
    console.log(`[Google Sheets] Creating new sheet: ${SHEET_NAME}`);
    sheet = await doc.addSheet({
      title: SHEET_NAME,
      headerValues: HEADERS,
    });
  } else {
    // Load rows to ensure headers are set
    await sheet.loadHeaderRow();

    // If headers don't match, set them
    const currentHeaders = sheet.headerValues;
    if (JSON.stringify(currentHeaders) !== JSON.stringify(HEADERS)) {
      console.log('[Google Sheets] Setting headers');
      await sheet.setHeaderRow(HEADERS);
    }
  }

  return sheet;
}

// Generate unique ID
function generateId(): string {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// Convert row to Lead object
function rowToLead(row: any): Lead {
  return {
    id: row.get('id'),
    name: row.get('name'),
    email: row.get('email'),
    phone: row.get('phone') || null,
    company: row.get('company') || null,
    budget: row.get('budget') || null,
    timeline: row.get('timeline') || null,
    requirements: row.get('requirements') || null,
    reference_url: row.get('reference_url') || null,
    industry: row.get('industry') || null,
    include_data_module: row.get('include_data_module') === 'true',
    include_maintenance_module: row.get('include_maintenance_module') === 'true',
    status: row.get('status') || 'pending',
    created_at: row.get('created_at'),
    updated_at: row.get('updated_at'),
  };
}

// Create a new lead
export async function createLead(data: LeadInsert): Promise<Lead> {
  const sheet = await getLeadsSheet();

  const now = new Date().toISOString();
  const leadData = {
    id: data.id || generateId(),
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    company: data.company || '',
    budget: data.budget || '',
    timeline: data.timeline || '',
    requirements: data.requirements || '',
    reference_url: data.reference_url || '',
    industry: data.industry || '',
    include_data_module: String(data.include_data_module || false),
    include_maintenance_module: String(data.include_maintenance_module || false),
    status: data.status || 'pending',
    created_at: data.created_at || now,
    updated_at: data.updated_at || now,
  };

  const row = await sheet.addRow(leadData);

  return rowToLead(row);
}

// Get all leads
export async function getAllLeads(): Promise<Lead[]> {
  const sheet = await getLeadsSheet();
  const rows = await sheet.getRows();

  return rows.map(rowToLead);
}

// Get lead by ID
export async function getLeadById(id: string): Promise<Lead | null> {
  const sheet = await getLeadsSheet();
  const rows = await sheet.getRows();

  const row = rows.find(r => r.get('id') === id);

  if (!row) {
    return null;
  }

  return rowToLead(row);
}

// Update lead status
export async function updateLeadStatus(id: string, status: Lead['status']): Promise<Lead | null> {
  const sheet = await getLeadsSheet();
  const rows = await sheet.getRows();

  const row = rows.find(r => r.get('id') === id);

  if (!row) {
    return null;
  }

  row.set('status', status);
  row.set('updated_at', new Date().toISOString());
  await row.save();

  return rowToLead(row);
}

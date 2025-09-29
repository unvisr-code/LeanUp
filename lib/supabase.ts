import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side supabase instance
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side supabase instance with service role key (for admin operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Database types
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          budget: 'under-500' | '500-1000' | '1000-3000' | '3000-5000' | 'over-5000' | null
          timeline: 'asap' | '1month' | '2month' | '3month' | 'over-3month' | null
          requirements: string | null
          reference_url: string | null
          industry: string | null
          include_data_module: boolean
          include_maintenance_module: boolean
          status: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          budget?: 'under-500' | '500-1000' | '1000-3000' | '3000-5000' | 'over-5000' | null
          timeline?: 'asap' | '1month' | '2month' | '3month' | 'over-3month' | null
          requirements?: string | null
          reference_url?: string | null
          industry?: string | null
          include_data_module?: boolean
          include_maintenance_module?: boolean
          status?: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          budget?: 'under-500' | '500-1000' | '1000-3000' | '3000-5000' | 'over-5000' | null
          timeline?: 'asap' | '1month' | '2month' | '3month' | 'over-3month' | null
          requirements?: string | null
          reference_url?: string | null
          industry?: string | null
          include_data_module?: boolean
          include_maintenance_module?: boolean
          status?: 'pending' | 'contacted' | 'quoted' | 'closed' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      portfolio: {
        Row: {
          id: string
          name: string
          description: string
          tech_stack: string[]
          service_type: string[]
          service_link: string | null
          category: 'web' | 'app' | 'landing'
          thumbnail: string | null
          detail_link: string | null
          features: string[] | null
          work_scope: string[] | null
          created_at: string
          updated_at: string
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          description: string
          tech_stack: string[]
          service_type: string[]
          service_link?: string | null
          category: 'web' | 'app' | 'landing'
          thumbnail?: string | null
          detail_link?: string | null
          features?: string[] | null
          work_scope?: string[] | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          description?: string
          tech_stack?: string[]
          service_type?: string[]
          service_link?: string | null
          category?: 'web' | 'app' | 'landing'
          thumbnail?: string | null
          detail_link?: string | null
          features?: string[] | null
          work_scope?: string[] | null
          created_at?: string
          updated_at?: string
          is_active?: boolean
          sort_order?: number
        }
      }
    }
  }
}

export type Lead = Database['public']['Tables']['leads']['Row']
export type Portfolio = Database['public']['Tables']['portfolio']['Row']
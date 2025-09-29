-- Create leads table for storing quote requests
CREATE TABLE IF NOT EXISTS public.leads (
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

-- Create portfolio table for storing portfolio items
CREATE TABLE IF NOT EXISTS public.portfolio (
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

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);

CREATE INDEX IF NOT EXISTS idx_portfolio_category ON public.portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_is_active ON public.portfolio(is_active);
CREATE INDEX IF NOT EXISTS idx_portfolio_sort_order ON public.portfolio(sort_order);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at columns
CREATE TRIGGER update_leads_updated_at
    BEFORE UPDATE ON public.leads
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_updated_at
    BEFORE UPDATE ON public.portfolio
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio ENABLE ROW LEVEL SECURITY;

-- Create policies for leads table
CREATE POLICY "Enable read access for all users" ON public.leads
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON public.leads
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for all users" ON public.leads
    FOR UPDATE USING (true);

-- Create policies for portfolio table
CREATE POLICY "Enable read access for all users" ON public.portfolio
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.portfolio
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.portfolio
    FOR UPDATE USING (true);

CREATE POLICY "Enable delete for authenticated users" ON public.portfolio
    FOR DELETE USING (true);
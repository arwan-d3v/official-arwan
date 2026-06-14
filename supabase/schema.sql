-- Create App Role Enum
CREATE TYPE app_role AS ENUM ('superadmin', 'admin', 'user');

-- Create Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR(255) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  role app_role DEFAULT 'user',
  is_vip BOOLEAN DEFAULT false,
  active_theme VARCHAR(50) DEFAULT 'dark-neon',
  dashboard_theme VARCHAR(50) DEFAULT 'nvidia',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Trigger Function to Sync Supabase Auth to Public Users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
DECLARE
  assigned_role public.app_role;
BEGIN
  IF new.email = 'admin@arwan.info' THEN
    assigned_role := 'superadmin'::public.app_role;
  ELSE
    assigned_role := 'user'::public.app_role;
  END IF;

  INSERT INTO public.users (id, email, username, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    assigned_role
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop trigger if exists to prevent duplication errors
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger for New User Signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Create Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  live_url VARCHAR(255),
  github_url VARCHAR(255),
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price_monthly DECIMAL(10, 2),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create Organizations Table
CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  billing_plan VARCHAR(50) DEFAULT 'free',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE org_role AS ENUM ('owner', 'admin', 'member');

-- Create Organization Members Table
CREATE TABLE organization_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  role org_role DEFAULT 'member',
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(organization_id, user_id)
);

-- Optional: Create index for faster username lookups (Dynamic Routing)
CREATE INDEX idx_users_username ON users(username);

-- Setup Row Level Security (RLS) for SaaS Backend
-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Users Table Policies
-- Users can only read and update their own profile
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- Admins can view all users
CREATE POLICY "Admins can view all users"
ON users FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM users AS u
    WHERE u.id = auth.uid() AND (u.role = 'admin' OR u.role = 'superadmin')
  )
);

-- Admins can update all users
CREATE POLICY "Admins can update all users"
ON users FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM users AS u
    WHERE u.id = auth.uid() AND (u.role = 'admin' OR u.role = 'superadmin')
  )
);

-- Projects Table Policies
-- Users can manage their own projects
CREATE POLICY "Users can view own projects"
ON projects FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects"
ON projects FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects"
ON projects FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects"
ON projects FOR DELETE
USING (auth.uid() = user_id);

-- Published projects are visible to everyone
CREATE POLICY "Published projects are visible to all"
ON projects FOR SELECT
USING (is_published = true);

-- Services Table Policies
-- Services are read-only for public/authenticated users (managed by admins only)
CREATE POLICY "Services are viewable by everyone"
ON services FOR SELECT
USING (is_active = true);

-- Add Admin policies for Services
CREATE POLICY "Admins can manage services"
ON services FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM users
    WHERE users.id = auth.uid() AND (users.role = 'admin' OR users.role = 'superadmin')
  )
);

-- Organizations Policies
CREATE POLICY "Users can view orgs they belong to"
ON organizations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = organizations.id
    AND organization_members.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create orgs"
ON organizations FOR INSERT
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Org owners and admins can update org"
ON organizations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM organization_members
    WHERE organization_members.organization_id = organizations.id
    AND organization_members.user_id = auth.uid()
    AND (organization_members.role = 'owner' OR organization_members.role = 'admin')
  )
);

-- Organization Members Policies
CREATE POLICY "Users can view members of their orgs"
ON organization_members FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM organization_members AS om
    WHERE om.organization_id = organization_members.organization_id
    AND om.user_id = auth.uid()
  )
);

CREATE POLICY "Org owners and admins can manage members"
ON organization_members FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM organization_members AS om
    WHERE om.organization_id = organization_members.organization_id
    AND om.user_id = auth.uid()
    AND (om.role = 'owner' OR om.role = 'admin')
  )
);

-- Create CV Type Enum
CREATE TYPE cv_template AS ENUM ('ATS_OPTIMIZED', 'MODERN_MINIMAL');

-- Create CV Documents Table
CREATE TABLE cv_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL DEFAULT 'Untitled CV',
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  template_type cv_template DEFAULT 'ATS_OPTIMIZED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable RLS
ALTER TABLE cv_documents ENABLE ROW LEVEL SECURITY;

-- CV Documents Policies
CREATE POLICY "Users can view own CVs"
ON cv_documents FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own CVs"
ON cv_documents FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own CVs"
ON cv_documents FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own CVs"
ON cv_documents FOR DELETE
USING (auth.uid() = user_id);

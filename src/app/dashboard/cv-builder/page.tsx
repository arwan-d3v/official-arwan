'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import CVConstructorLayout from '@/components/cv-builder/CVConstructorLayout';

export default function DashboardCVBuilderPage() {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Also fetch the user's plan_type/is_vip from public.users
        const { data: userData } = await supabase
          .from('users')
          .select('is_vip, role')
          .eq('id', user.id)
          .single();
          
        setUser({ ...user, ...userData });
      }
    }
    getUser();
  }, [supabase]);

  const handleSave = async (data: any, templateType: string) => {
    if (!user) return alert("You must be logged in to save.");

    // Gatekeeping Logic
    if (!user.is_vip && templateType === 'MODERN_MINIMAL') {
      alert("UPSELL: The MODERN_MINIMAL template is exclusive to VIP accounts. Please upgrade to save this template, or switch to ATS_OPTIMIZED.");
      return;
    }

    try {
      const { error } = await supabase
        .from('cv_documents')
        .insert({
          user_id: user.id,
          title: `${data.personalIdentity.fullName || 'Untitled'} - ${templateType}`,
          data: data,
          template_type: templateType
        });

      if (error) {
        console.error("Save Error:", error);
        alert("Failed to save CV to Vault: " + error.message);
      } else {
        alert("CV successfully saved to your Project Vault!");
      }
    } catch (err: any) {
      console.error(err);
      alert("An unexpected error occurred.");
    }
  };

  return (
    <div className="w-full h-[calc(100vh-4rem)]">
      <CVConstructorLayout 
        isGuest={false} 
        isVip={user?.is_vip || false}
        onSave={handleSave} 
      />
    </div>
  );
}

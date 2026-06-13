"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Building2, Plus, Save, Trash2, Edit } from "lucide-react";

export default function OrganizationsPage() {
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [billingPlan, setBillingPlan] = useState("free");

  const supabase = createClient();

  useEffect(() => {
    fetchOrganizations();
  }, []);

  async function fetchOrganizations() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      // Fetch orgs where user is a member
      const { data } = await supabase
        .from("organizations")
        .select(`*, organization_members!inner(role)`)
        .order("created_at", { ascending: false });
      
      setOrganizations(data || []);
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;

    const payload = {
      name,
      slug,
      billing_plan: billingPlan
    };

    if (editingId) {
      await supabase.from("organizations").update(payload).eq("id", editingId);
    } else {
      // Create new org
      const { data, error } = await supabase.from("organizations").insert(payload).select().single();
      if (data && !error) {
        // Also insert member as owner
        await supabase.from("organization_members").insert({
          organization_id: data.id,
          user_id: userId,
          role: 'owner'
        });
      }
    }

    resetForm();
    fetchOrganizations();
  }

  async function handleDelete(id: string) {
    await supabase.from("organizations").delete().eq("id", id);
    fetchOrganizations();
  }

  function handleEdit(org: any) {
    setEditingId(org.id);
    setName(org.name);
    setSlug(org.slug);
    setBillingPlan(org.billing_plan || "free");
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setSlug("");
    setBillingPlan("free");
  }

  if (loading) return <div className="text-primary animate-pulse text-2xl font-mono">LOADING_TENANT_RECORDS...</div>;

  return (
    <div className="font-mono max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-primary/30 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-primary flex items-center gap-4">
            <Building2 className="w-8 h-8" /> WORKSPACE_MANAGER
          </h1>
          <p className="text-primary/60 mt-2">ACCESS_LEVEL: [TENANT_LEVEL] - MANAGE_YOUR_ORGANIZATIONS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editor Form */}
        <div className="lg:col-span-1 border border-primary/30 bg-secondary/5 p-6 rounded-md shadow-[0_0_15px_rgba(var(--primary),0.05)]">
          <h2 className="text-xl font-bold text-primary/80 mb-6 flex items-center gap-2">
            {editingId ? <Edit size={18} /> : <Plus size={18} />}
            {editingId ? "EDIT_WORKSPACE" : "NEW_WORKSPACE"}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs text-foreground/60">WORKSPACE_NAME</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-foreground/60">TENANT_SLUG (unique)</label>
              <input required value={slug} onChange={e => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))} placeholder="my-company" className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-foreground/60">BILLING_PLAN</label>
              <select value={billingPlan} onChange={e => setBillingPlan(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors">
                <option value="free">FREE</option>
                <option value="pro">PRO</option>
                <option value="enterprise">ENTERPRISE</option>
              </select>
            </div>
            
            <div className="pt-4 flex gap-2">
              <button type="submit" className="flex-1 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "UPDATE" : "CREATE"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 border border-secondary text-foreground/70 hover:bg-secondary/20 rounded transition-colors">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Organizations List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground/80 mb-6">TENANT_DATABASE [{organizations.length}]</h2>
          {organizations.length === 0 ? (
            <div className="border border-dashed border-secondary/40 p-12 text-center text-foreground/50 rounded-md">
              NO_WORKSPACES_DETECTED
            </div>
          ) : (
            organizations.map(org => {
              // Note: role from the inner join
              const role = org.organization_members?.[0]?.role || 'unknown';
              const isOwnerOrAdmin = role === 'owner' || role === 'admin';

              return (
                <div key={org.id} className="border border-primary/20 bg-black/30 p-5 rounded-md hover:border-primary/50 transition-colors flex justify-between items-start group">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-primary">{org.name}</h3>
                      <span className="text-[10px] px-2 py-0.5 bg-primary/10 text-primary border border-primary/20">
                        PLAN: {org.billing_plan.toUpperCase()}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 bg-secondary/10 text-foreground/60 border border-secondary/20 font-bold">
                        ROLE: {role.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-foreground/60 max-w-xl truncate">Slug: {org.slug}</p>
                  </div>
                  
                  {isOwnerOrAdmin && (
                    <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleEdit(org)} className="p-2 bg-secondary/20 hover:bg-primary/20 hover:text-primary rounded text-foreground transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(org.id)} className="p-2 bg-secondary/20 hover:bg-red-500/20 hover:text-red-500 rounded text-foreground transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
}

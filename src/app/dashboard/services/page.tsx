"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShieldAlert, Plus, Save, Trash2, Edit, Activity } from "lucide-react";
import Link from "next/link";

export default function ServicesManagerPage() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priceMonthly, setPriceMonthly] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    checkAdminAndFetchServices();
  }, []);

  async function checkAdminAndFetchServices() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      // In a real app, use a proper role column. For MVP, we check if they are VIP.
      const { data: profile } = await supabase
        .from("users")
        .select("is_vip")
        .eq("id", user.id)
        .single();

      if (profile?.is_vip) {
        setIsAdmin(true);
        fetchServices();
      } else {
        setIsAdmin(false);
      }
    }
    setLoading(false);
  }

  async function fetchServices() {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("created_at", { ascending: false });
    
    setServices(data || []);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      name,
      description,
      price_monthly: priceMonthly,
      is_active: isActive
    };

    if (editingId) {
      await supabase.from("services").update(payload).eq("id", editingId);
    } else {
      await supabase.from("services").insert(payload);
    }

    resetForm();
    fetchServices();
  }

  async function handleDelete(id: string) {
    await supabase.from("services").delete().eq("id", id);
    fetchServices();
  }

  function handleEdit(service: any) {
    setEditingId(service.id);
    setName(service.name);
    setDescription(service.description || "");
    setPriceMonthly(service.price_monthly || 0);
    setIsActive(service.is_active || false);
  }

  function resetForm() {
    setEditingId(null);
    setName("");
    setDescription("");
    setPriceMonthly(0);
    setIsActive(true);
  }

  if (loading) return <div className="text-red-500 animate-pulse text-2xl font-mono">VERIFYING_CLEARANCE...</div>;

  if (!isAdmin) {
    return (
      <div className="max-w-2xl border border-red-500/50 bg-red-500/5 p-12 rounded-lg mt-12 font-mono">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-widest">ACCESS_DENIED</h1>
        <p className="text-xl text-red-400/80 mb-8 leading-relaxed">
          CRITICAL_ERROR: You do not have sufficient clearance to access the Services Manager.
          Requires [ADMIN] privileges.
        </p>
        <Link href="/dashboard" className="px-8 py-3 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all font-bold">
          RETURN_TO_SAFE_ZONE
        </Link>
      </div>
    );
  }

  return (
    <div className="font-mono max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-red-500/30 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-red-500 flex items-center gap-4">
            <Activity className="w-8 h-8" /> SERVICES_MANAGER
          </h1>
          <p className="text-red-500/60 mt-2">ACCESS_LEVEL: [ADMIN] - SYSTEM_WIDE_IMPACT</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editor Form */}
        <div className="lg:col-span-1 border border-red-500/30 bg-red-500/5 p-6 rounded-md">
          <h2 className="text-xl font-bold text-red-500/80 mb-6 flex items-center gap-2">
            {editingId ? <Edit size={18} /> : <Plus size={18} />}
            {editingId ? "EDIT_SERVICE" : "NEW_SERVICE"}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs text-red-500/60">SERVICE_NAME</label>
              <input required value={name} onChange={e => setName(e.target.value)} className="w-full bg-black/40 border border-red-500/20 rounded px-3 py-2 text-foreground focus:border-red-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-red-500/60">DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/40 border border-red-500/20 rounded px-3 py-2 text-foreground h-24 focus:border-red-500 outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-red-500/60">MONTHLY_PRICE_USD</label>
              <input type="number" step="0.01" value={priceMonthly} onChange={e => setPriceMonthly(parseFloat(e.target.value))} className="w-full bg-black/40 border border-red-500/20 rounded px-3 py-2 text-foreground focus:border-red-500 outline-none transition-colors" />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} className="accent-red-500 w-4 h-4" />
              <label className="text-sm font-bold text-red-500">IS_ACTIVE (VISIBLE_TO_PUBLIC)</label>
            </div>
            
            <div className="pt-4 flex gap-2">
              <button type="submit" className="flex-1 bg-red-500/20 text-red-500 border border-red-500 hover:bg-red-500 hover:text-white font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "UPDATE_NODE" : "DEPLOY_NODE"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 border border-red-500/30 text-red-500/70 hover:bg-red-500/20 rounded transition-colors">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Services List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground/80 mb-6">SERVICES_DATABASE [{services.length}]</h2>
          {services.length === 0 ? (
            <div className="border border-dashed border-red-500/40 p-12 text-center text-red-500/50 rounded-md">
              NO_SERVICES_DETECTED
            </div>
          ) : (
            services.map(s => (
              <div key={s.id} className="border border-red-500/20 bg-black/30 p-5 rounded-md hover:border-red-500/50 transition-colors flex justify-between items-start group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-red-400">{s.name}</h3>
                    <span className="text-sm font-bold text-emerald-400">${s.price_monthly}/mo</span>
                    {s.is_active ? (
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">LIVE</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20">OFFLINE</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/60 max-w-xl truncate">{s.description || "NO_DESCRIPTION"}</p>
                </div>
                
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(s)} className="p-2 bg-red-500/10 hover:bg-red-500/30 hover:text-red-400 rounded text-red-500 transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(s.id)} className="p-2 bg-red-500/10 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}

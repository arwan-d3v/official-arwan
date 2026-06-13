"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { ShieldAlert, Users, Edit, Save } from "lucide-react";
import Link from "next/link";

export default function UsersAdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>("user");

  const supabase = createClient();

  useEffect(() => {
    checkAdminAndFetchUsers();
  }, []);

  async function checkAdminAndFetchUsers() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    
    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role === 'admin' || profile?.role === 'superadmin') {
        setIsAdmin(true);
        fetchUsers();
      } else {
        setIsAdmin(false);
      }
    }
    setLoading(false);
  }

  async function fetchUsers() {
    const { data } = await supabase
      .from("users")
      .select("*")
      .order("created_at", { ascending: false });
    
    setUsers(data || []);
  }

  async function handleRoleUpdate(id: string) {
    await supabase.from("users").update({ role: selectedRole }).eq("id", id);
    setEditingId(null);
    fetchUsers();
  }

  if (loading) return <div className="text-red-500 animate-pulse text-2xl font-mono">VERIFYING_CLEARANCE...</div>;

  if (!isAdmin) {
    return (
      <div className="max-w-2xl border border-red-500/50 bg-red-500/5 p-12 rounded-lg mt-12 font-mono">
        <ShieldAlert className="w-20 h-20 text-red-500 mb-6 animate-bounce" />
        <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-widest">ACCESS_DENIED</h1>
        <p className="text-xl text-red-400/80 mb-8 leading-relaxed">
          CRITICAL_ERROR: You do not have sufficient clearance to access the Users Admin Manager.
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
            <Users className="w-8 h-8" /> USERS_MANAGER
          </h1>
          <p className="text-red-500/60 mt-2">ACCESS_LEVEL: [ADMIN] - SYSTEM_WIDE_IMPACT</p>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-foreground/80 mb-6">USERS_DATABASE [{users.length}]</h2>
        {users.length === 0 ? (
          <div className="border border-dashed border-red-500/40 p-12 text-center text-red-500/50 rounded-md">
            NO_USERS_DETECTED
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(u => (
              <div key={u.id} className="border border-red-500/20 bg-black/30 p-5 rounded-md hover:border-red-500/50 transition-colors flex flex-col group">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-red-400">{u.username}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-red-500/10 text-red-500 border border-red-500/20 font-bold">
                    {u.role ? u.role.toUpperCase() : 'UNKNOWN'}
                  </span>
                </div>
                <p className="text-sm text-foreground/60 mb-1">{u.email}</p>
                <p className="text-xs text-foreground/40 mb-4">ID: {u.id}</p>
                
                {editingId === u.id ? (
                  <div className="flex gap-2 items-center mt-auto">
                    <select 
                      value={selectedRole}
                      onChange={(e) => setSelectedRole(e.target.value)}
                      className="bg-black/40 border border-red-500/40 text-red-400 text-sm rounded px-2 py-1 flex-1 outline-none font-bold"
                    >
                      <option value="user">USER</option>
                      <option value="admin">ADMIN</option>
                      <option value="superadmin">SUPERADMIN</option>
                    </select>
                    <button onClick={() => handleRoleUpdate(u.id)} className="p-1.5 bg-red-500/20 hover:bg-red-500 hover:text-white rounded text-red-500 transition-colors">
                      <Save size={16} />
                    </button>
                    <button onClick={() => setEditingId(null)} className="p-1.5 border border-red-500/30 text-red-500/70 hover:bg-red-500/20 rounded transition-colors text-xs font-bold">
                      X
                    </button>
                  </div>
                ) : (
                  <div className="mt-auto pt-2 border-t border-red-500/10 flex justify-end opacity-50 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => { setEditingId(u.id); setSelectedRole(u.role || 'user'); }} 
                      className="flex items-center gap-1 text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-2 py-1 rounded"
                    >
                      <Edit size={12} /> CHANGE_ROLE
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

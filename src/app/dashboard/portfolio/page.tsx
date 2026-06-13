"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Lock, Plus, Save, Trash2, Edit } from "lucide-react";

export default function PortfolioBuilderPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUserId(user.id);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });
      
      setProjects(data || []);
    }
    setLoading(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return;

    const payload = {
      user_id: userId,
      title,
      description,
      github_url: githubUrl,
      live_url: liveUrl,
      is_published: isPublished
    };

    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
    } else {
      await supabase.from("projects").insert(payload);
    }

    resetForm();
    fetchProjects();
  }

  async function handleDelete(id: string) {
    await supabase.from("projects").delete().eq("id", id);
    fetchProjects();
  }

  function handleEdit(project: any) {
    setEditingId(project.id);
    setTitle(project.title);
    setDescription(project.description || "");
    setGithubUrl(project.github_url || "");
    setLiveUrl(project.live_url || "");
    setIsPublished(project.is_published || false);
  }

  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setGithubUrl("");
    setLiveUrl("");
    setIsPublished(false);
  }

  if (loading) return <div className="text-primary animate-pulse text-2xl font-mono">LOADING_MODULES...</div>;

  return (
    <div className="font-mono max-w-6xl mx-auto">
      <div className="flex justify-between items-end mb-12 border-b border-primary/30 pb-4">
        <div>
          <h1 className="text-4xl font-bold text-primary flex items-center gap-4">
            <Lock className="w-8 h-8" /> PORTFOLIO_BUILDER
          </h1>
          <p className="text-primary/60 mt-2">ACCESS_LEVEL: [OWNER] - MANAGE_YOUR_PROJECTS</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Editor Form */}
        <div className="lg:col-span-1 border border-primary/30 bg-secondary/5 p-6 rounded-md shadow-[0_0_15px_rgba(var(--primary),0.05)]">
          <h2 className="text-xl font-bold text-primary/80 mb-6 flex items-center gap-2">
            {editingId ? <Edit size={18} /> : <Plus size={18} />}
            {editingId ? "EDIT_PROJECT" : "NEW_PROJECT"}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="text-xs text-foreground/60">TITLE</label>
              <input required value={title} onChange={e => setTitle(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-foreground/60">DESCRIPTION</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground h-24 focus:border-primary outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-foreground/60">GITHUB_URL</label>
              <input value={githubUrl} onChange={e => setGithubUrl(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors" />
            </div>
            <div>
              <label className="text-xs text-foreground/60">LIVE_URL</label>
              <input value={liveUrl} onChange={e => setLiveUrl(e.target.value)} className="w-full bg-black/40 border border-primary/20 rounded px-3 py-2 text-foreground focus:border-primary outline-none transition-colors" />
            </div>
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} className="accent-primary w-4 h-4" />
              <label className="text-sm font-bold text-primary">PUBLISH_TO_PUBLIC_PORTFOLIO</label>
            </div>
            
            <div className="pt-4 flex gap-2">
              <button type="submit" className="flex-1 bg-primary/20 text-primary border border-primary hover:bg-primary hover:text-primary-foreground font-bold py-2 rounded transition-colors flex items-center justify-center gap-2">
                <Save size={18} /> {editingId ? "UPDATE" : "SAVE"}
              </button>
              {editingId && (
                <button type="button" onClick={resetForm} className="px-4 border border-secondary text-foreground/70 hover:bg-secondary/20 rounded transition-colors">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold text-foreground/80 mb-6">PROJECT_DATABASE [{projects.length}]</h2>
          {projects.length === 0 ? (
            <div className="border border-dashed border-secondary/40 p-12 text-center text-foreground/50 rounded-md">
              NO_RECORDS_FOUND
            </div>
          ) : (
            projects.map(p => (
              <div key={p.id} className="border border-primary/20 bg-black/30 p-5 rounded-md hover:border-primary/50 transition-colors flex justify-between items-start group">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-bold text-primary">{p.title}</h3>
                    {p.is_published ? (
                      <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">PUBLISHED</span>
                    ) : (
                      <span className="text-[10px] px-2 py-0.5 bg-secondary/10 text-foreground/50 border border-secondary/20">DRAFT</span>
                    )}
                  </div>
                  <p className="text-sm text-foreground/60 max-w-xl truncate">{p.description || "NO_DESCRIPTION"}</p>
                </div>
                
                <div className="flex gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(p)} className="p-2 bg-secondary/20 hover:bg-primary/20 hover:text-primary rounded text-foreground transition-colors">
                    <Edit size={16} />
                  </button>
                  <button onClick={() => handleDelete(p.id)} className="p-2 bg-secondary/20 hover:bg-red-500/20 hover:text-red-500 rounded text-foreground transition-colors">
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

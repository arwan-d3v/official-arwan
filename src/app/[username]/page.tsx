import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ExternalLink, Folder, Code2, Star, Activity, GitBranch } from 'lucide-react';
import { getGitHubStats } from '@/lib/github';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import LiveCVViewer from '@/components/cv-builder/LiveCVViewer';

const GithubIcon = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => {
  const { size = 24, ...rest } = props;
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...rest}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
};

interface UserPortfolioPageProps {
  params: Promise<{ username: string }>;
}

export default async function UserPortfolioPage({ params }: UserPortfolioPageProps) {
  const resolvedParams = await params;
  const { username } = resolvedParams;

  const supabase = await createClient();

  // Query user profile
  const { data: userProfile, error: userError } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .single();

  if (userError || !userProfile) {
    notFound();
  }

  // Query user published projects
  const { data: userProjects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', userProfile.id)
    .eq('is_published', true);

  // Fetch GitHub Stats
  const githubStats = await getGitHubStats(username);

  // Fetch CV Document
  const { data: cvDoc } = await supabase
    .from('cv_documents')
    .select('data, template_type')
    .eq('user_id', userProfile.id)
    .single();

  const activeTheme = userProfile.active_theme || 'minimalist';

  return (
    <div 
      data-theme={activeTheme} 
      className="min-h-screen bg-background text-foreground transition-colors duration-500 py-16 px-4 md:px-8"
    >
      <div className="max-w-5xl mx-auto flex flex-col gap-16">
        
        {/* Header / Profile Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-secondary/20 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/30 text-xs font-semibold uppercase tracking-wider mb-4 border border-secondary/40">
              SaaS Hosted Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
              {username}
            </h1>
            <p className="text-lg text-foreground/70 font-mono">
              <TypewriterEffect text={`Welcome to my professional workspace & portfolio.`} speed={40} delay={500} />
            </p>
          </div>

          <div className="flex items-center gap-3">
            {userProfile.is_vip ? (
              <span className="px-3.5 py-1.5 rounded-full bg-primary/20 text-primary border border-primary/30 text-sm font-bold uppercase tracking-wide shadow-sm">
                VIP Member
              </span>
            ) : (
              <span className="px-3.5 py-1.5 rounded-full bg-secondary/50 text-foreground/60 border border-secondary/30 text-sm font-medium uppercase tracking-wide">
                Free Tier
              </span>
            )}
          </div>
        </header>

        {/* GitHub Stats Widget */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><GitBranch size={20} /></div>
            <div>
              <div className="text-2xl font-bold">{githubStats.reposCount}</div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">Repositories</div>
            </div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><Star size={20} /></div>
            <div>
              <div className="text-2xl font-bold">{githubStats.stars}</div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">Total Stars</div>
            </div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><Code2 size={20} /></div>
            <div>
              <div className="text-2xl font-bold">{(githubStats.linesOfCode / 1000).toFixed(1)}k</div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">Lines of Code</div>
            </div>
          </div>
          <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-xl flex items-center gap-4 hover:border-primary/50 transition-colors">
            <div className="p-3 bg-primary/10 text-primary rounded-lg"><Activity size={20} /></div>
            <div>
              <div className="text-2xl font-bold text-emerald-500">{githubStats.uptime}</div>
              <div className="text-xs text-foreground/60 uppercase tracking-wider">System Uptime</div>
            </div>
          </div>
        </section>

        {/* Portfolio Content: Projects */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <Folder className="text-primary" size={28} />
            <h2 className="text-2xl font-bold">Published Projects</h2>
          </div>

          {userProjects && userProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userProjects.map((project) => (
                <Card 
                  key={project.id} 
                  className="bg-secondary/10 border-secondary/20 hover:border-primary/40 transition-all duration-300 group shadow-md"
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-foreground/60 mt-1 line-clamp-3">
                      {project.description || "No description provided."}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end gap-3 border-t border-secondary/10 pt-4 mt-auto">
                    {project.github_url && (
                      <a 
                        href={project.github_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary/20 hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon size={18} />
                      </a>
                    )}
                    {project.live_url && (
                      <a 
                        href={project.live_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-secondary/20 hover:bg-primary/20 text-foreground hover:text-primary transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border-2 border-dashed border-secondary/20 rounded-2xl bg-secondary/5">
              <p className="text-foreground/50 font-medium text-lg">No projects published yet.</p>
              <p className="text-foreground/40 text-sm mt-1">Please add and publish projects from your Admin Dashboard.</p>
            </div>
          )}
        </section>

        {/* Live Resume / CV Document */}
        {cvDoc && cvDoc.data && (
          <section className="flex flex-col gap-8">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 text-primary rounded-lg"><Code2 size={24} /></div>
              <h2 className="text-2xl font-bold">Live Professional Resume</h2>
            </div>
            
            <div className="bg-secondary/5 border border-secondary/20 p-4 md:p-12 rounded-3xl overflow-x-auto flex justify-center custom-scrollbar shadow-inner">
              {/* Scale down the A4 wrapper on small screens if necessary, but tailwind handles the canvas */}
              <div className="origin-top transform scale-75 md:scale-100 shadow-2xl transition-transform">
                <LiveCVViewer data={cvDoc.data} templateType={cvDoc.template_type} isVip={userProfile.is_vip} />
              </div>
            </div>
          </section>
        )}

        {/* Footer info branding */}
        <footer className="mt-12 text-center text-xs text-foreground/40 border-t border-secondary/20 pt-8">
          <p>System architected by <span className="font-semibold text-primary">Arwan</span> &copy; 2026</p>
        </footer>

      </div>
    </div>
  );
}

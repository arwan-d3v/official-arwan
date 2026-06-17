import React from 'react';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ExternalLink, Folder, Code2, Star, Activity, GitBranch } from 'lucide-react';
import { getGitHubStats } from '@/lib/github';
import { TypewriterEffect } from '@/components/ui/TypewriterEffect';
import LiveCVViewer from '@/components/cv-builder/LiveCVViewer';
import { CVData } from '@/components/cv-builder/types';
import { mockArwanData } from '../../../mockData';
import { Briefcase, Award, Zap } from 'lucide-react';

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

interface Project {
  id: string;
  title: string;
  description: string | null;
  github_url: string | null;
  live_url: string | null;
}

interface GitHubStats {
  reposCount: number;
  stars: number;
  linesOfCode: number;
  uptime: string;
}

interface CvDoc {
  data: CVData;
  template_type: string;
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

  // Default variables
  let userProjects: Project[] | null = null;
  let githubStats: GitHubStats = { reposCount: 0, stars: 0, linesOfCode: 0, uptime: '99.9%' };
  let cvDoc: CvDoc | null = null;

  // Mock UI specific logic for 'arwan'
  const isMockArwan = username.toLowerCase() === 'arwan';

  if (!isMockArwan) {
    // Query user published projects only for non-mock users
    const { data: fetchedProjects } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', userProfile.id)
      .eq('is_published', true);

    userProjects = fetchedProjects;

    // Fetch GitHub Stats
    githubStats = await getGitHubStats(username);

    // Fetch CV Document
    const { data: fetchedCvDoc } = await supabase
      .from('cv_documents')
      .select('data, template_type')
      .eq('user_id', userProfile.id)
      .single();

    if (fetchedCvDoc) {
      cvDoc = {
        data: fetchedCvDoc.data as unknown as CVData,
        template_type: fetchedCvDoc.template_type
      };
    }
  } else {
    // For arwan mock, populate dummy stats
    githubStats = { reposCount: 142, stars: 840, linesOfCode: 420000, uptime: '99.99%' };
  }

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

        {isMockArwan && (
          <>
            {/* IT Experience Section */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <Briefcase className="text-primary" size={28} />
                <h2 className="text-2xl font-bold">IT Experience</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArwanData.itExperiences.map((exp) => (
                  <Card key={exp.id} className="glass-extreme hover:border-primary/40 transition-all duration-300 group shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{exp.role}</CardTitle>
                      <CardDescription className="text-foreground/80 font-semibold">{exp.company}</CardDescription>
                      <div className="text-xs text-foreground/50 mt-1">{exp.duration}</div>
                    </CardHeader>
                    <CardContent className="text-sm text-foreground/70 flex flex-col gap-4">
                      <p>{exp.description}</p>

                      {/* Media Embeds */}
                      {exp.media && (
                        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-secondary/20">
                          {exp.media.video && (
                            <div className="w-full rounded-lg overflow-hidden border border-secondary/30 relative bg-black aspect-video flex items-center justify-center group/video cursor-pointer">
                              <video src={exp.media.video} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity" preload="metadata" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm shadow-lg text-primary-foreground transform group-hover/video:scale-110 transition-transform">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                                </div>
                              </div>
                            </div>
                          )}

                          {exp.media.images && exp.media.images.length > 0 && (
                            <div className={`grid gap-2 ${exp.media.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                              {exp.media.images.map((img, idx) => (
                                <div key={idx} className="w-full h-24 rounded-lg overflow-hidden border border-secondary/30 bg-secondary/10 relative group/img">
                                  {/* Next.js Image component normally preferred, using standard img for mock generic urls */}
                                  <img src={img} alt="Project Media" className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-500" loading="lazy" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Freelance Experience Section */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center gap-3">
                <Zap className="text-primary" size={28} />
                <h2 className="text-2xl font-bold">Freelance Projects</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockArwanData.freelanceExperiences.map((exp) => (
                  <Card key={exp.id} className="glass-extreme hover:border-primary/40 transition-all duration-300 group shadow-md flex flex-col h-full">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{exp.project}</CardTitle>
                      <CardDescription className="text-foreground/80 font-semibold">{exp.client}</CardDescription>
                      <div className="text-xs text-foreground/50 mt-1">{exp.duration}</div>
                    </CardHeader>
                    <CardContent className="text-sm text-foreground/70 flex flex-col gap-4 flex-1">
                      <p>{exp.description}</p>

                      {/* Media Embeds */}
                      {exp.media && (
                        <div className="flex flex-col gap-2 mt-auto pt-4 border-t border-secondary/20">
                          {exp.media.video && (
                            <div className="w-full rounded-lg overflow-hidden border border-secondary/30 relative bg-black aspect-video flex items-center justify-center group/video cursor-pointer">
                              <video src={exp.media.video} className="w-full h-full object-cover opacity-80 group-hover/video:opacity-100 transition-opacity" preload="metadata" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-primary/80 flex items-center justify-center backdrop-blur-sm shadow-lg text-primary-foreground transform group-hover/video:scale-110 transition-transform">
                                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9-14 9V3z"/></svg>
                                </div>
                              </div>
                            </div>
                          )}

                          {exp.media.images && exp.media.images.length > 0 && (
                            <div className={`grid gap-2 ${exp.media.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                              {exp.media.images.map((img, idx) => (
                                <div key={idx} className="w-full h-24 rounded-lg overflow-hidden border border-secondary/30 bg-secondary/10 relative group/img">
                                  <img src={img} alt="Project Media" className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 group-hover/img:scale-110 transition-all duration-500" loading="lazy" />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Skills & Certificates Section */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Code2 className="text-primary" size={28} />
                  <h2 className="text-2xl font-bold">Technical Skills</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {mockArwanData.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <Award className="text-primary" size={28} />
                  <h2 className="text-2xl font-bold">Certifications</h2>
                </div>
                <div className="space-y-4">
                  {mockArwanData.certificates.map((cert) => (
                    <div key={cert.id} className="p-4 glass-extreme rounded-xl flex justify-between items-center hover:border-primary/40 transition-colors">
                      <div>
                        <div className="font-bold text-foreground/90">{cert.name}</div>
                        <div className="text-sm text-foreground/60">{cert.issuer}</div>
                      </div>
                      <div className="text-xs px-2 py-1 bg-secondary/30 rounded text-foreground/80 font-mono">
                        {cert.year}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {!isMockArwan && (
          <>
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
                  className="glass-extreme hover:border-primary/40 transition-all duration-300 group shadow-md"
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
            
            <div className="glass-extreme p-4 md:p-12 rounded-3xl overflow-x-auto flex justify-center custom-scrollbar shadow-inner">
              {/* Scale down the A4 wrapper on small screens if necessary, but tailwind handles the canvas */}
              <div className="origin-top transform scale-75 md:scale-100 shadow-2xl transition-transform">
                <LiveCVViewer data={cvDoc.data} templateType={cvDoc.template_type} isVip={userProfile.is_vip} />
              </div>
            </div>
          </section>
        )}
          </>
        )}

        {/* Footer info branding */}
        <footer className="mt-12 text-center text-xs text-foreground/40 border-t border-secondary/20 pt-8">
          <p>System architected by <span className="font-semibold text-primary">Arwan</span> &copy; 2026</p>
        </footer>

      </div>
    </div>
  );
}

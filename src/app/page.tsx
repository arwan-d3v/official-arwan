import MegaMenu from '@/components/ui/MegaMenu';
import KiroiXTelemetry from '@/components/ui/KiroiXTelemetry';
import ThemeSelector from '@/components/ui/ThemeSelector';
import GlobalFooter from '@/components/ui/GlobalFooter';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)
    .order('price_monthly', { ascending: true });

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500">
      <MegaMenu />

      <main className="flex-grow flex flex-col gap-24 py-16">
        {/* Hero Section */}
        <section className="px-4 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-balance">
            Centralized <span className="text-primary">Ecosystem</span> SaaS
          </h1>
          <p className="text-lg md:text-xl text-foreground/70 mb-10 max-w-2xl mx-auto">
            Live Portfolio & High-Performance Trading Infrastructure. Architected for speed, reliability, and unparalleled design.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="#services" className="px-8 py-3 rounded-full bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity">
              Explore Services
            </Link>
            <Link href="/dashboard" className="px-8 py-3 rounded-full bg-secondary text-foreground font-bold hover:bg-secondary/80 transition-colors">
              Go to Dashboard
            </Link>
          </div>
        </section>

        {/* Dynamic Services Grid */}
        <section id="services" className="px-4 max-w-7xl mx-auto w-full scroll-mt-24">
          <h2 className="text-3xl font-bold mb-8 text-center">Active Services</h2>
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <div key={service.id} className="rounded-2xl bg-secondary/10 border border-secondary/20 p-8 hover:border-primary/50 transition-colors flex flex-col">
                  <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                  <div className="text-3xl font-extrabold text-primary mb-4">
                    ${service.price_monthly}<span className="text-sm text-foreground/50 font-normal">/mo</span>
                  </div>
                  <p className="text-foreground/70 mb-8 flex-grow">{service.description}</p>
                  <button className="w-full py-3 rounded-xl bg-primary/20 text-primary font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
                    Subscribe Now
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border border-dashed border-secondary/30 rounded-2xl bg-secondary/5">
              <p className="text-foreground/50">No active services available at the moment.</p>
            </div>
          )}
        </section>

        {/* KiroiX Telemetry Widget */}
        <section className="px-4 w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Live MT5 Integration</h2>
            <p className="text-foreground/60">Real-time telemetry from KiroiX EA nodes.</p>
          </div>
          <KiroiXTelemetry />
        </section>

        {/* Pricing Funnel Mockup */}
        <section className="px-4 max-w-5xl mx-auto w-full text-center">
            <div className="bg-gradient-to-r from-primary/20 via-background to-primary/20 p-[1px] rounded-3xl">
              <div className="bg-background rounded-[23px] py-16 px-8 border border-primary/20">
                <h2 className="text-4xl font-bold mb-4">Unlock the Full Potential</h2>
                <p className="text-foreground/70 mb-8 max-w-xl mx-auto">Access 25+ premium VIP themes, dedicated SaaS instances, and low-latency KiroiX routing.</p>
                <button className="px-10 py-4 rounded-full bg-primary text-primary-foreground font-bold text-lg hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all duration-300">
                  Upgrade to VIP
                </button>
              </div>
            </div>
        </section>

        {/* Theme Selector */}
        <section className="px-4 w-full">
          <ThemeSelector />
        </section>

      </main>

      <GlobalFooter />
    </div>
  );
}

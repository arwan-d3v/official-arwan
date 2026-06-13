"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { createClient } from "@/lib/supabase/client";

const MegaMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminTheme, setAdminTheme] = useState<"nvidia" | "cyan">("nvidia");
  const [isDashboard, setIsDashboard] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    // Check path on mount
    setIsDashboard(window.location.pathname.includes('/dashboard'));

    async function loadTheme() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("users")
          .select("dashboard_theme")
          .eq("id", user.id)
          .single();
        
        if (data?.dashboard_theme === "cyan" || data?.dashboard_theme === "nvidia") {
          setAdminTheme(data.dashboard_theme);
          if (window.location.pathname.includes('/dashboard')) {
            document.documentElement.setAttribute('data-admin-theme', data.dashboard_theme);
          }
        }
      }
    }
    loadTheme();
  }, [supabase]);

  const toggleAdminTheme = async () => {
    const newTheme = adminTheme === "nvidia" ? "cyan" : "nvidia";
    setAdminTheme(newTheme);

    if (isDashboard) {
       document.documentElement.setAttribute('data-admin-theme', newTheme);
    }

    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from("users")
        .update({ dashboard_theme: newTheme })
        .eq("id", user.id);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-background/90 border-b border-secondary/30 border-t-[3px] border-t-primary shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Sparkles className="text-primary h-6 w-6" />
            <span className="font-bold text-xl tracking-tight text-foreground">KiroiX Ecosystem</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 text-foreground/80 hover:text-primary transition-colors font-medium">
                <span>Services</span>
                <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
              </button>
              {/* Dropdown simplified for styling */}
              <div className="absolute top-full left-0 mt-2 w-48 rounded-md shadow-lg bg-background border border-secondary/30 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 p-2">
                <Link href="#" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary/50 hover:text-primary rounded-md">Portfolio Builder</Link>
                <Link href="#" className="block px-4 py-2 text-sm text-foreground/80 hover:bg-secondary/50 hover:text-primary rounded-md">SaaS Infrastructure</Link>
              </div>
            </div>

            <Link href="#" className="text-foreground/80 hover:text-primary transition-colors font-medium">Live Systems</Link>
            <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-medium">Dashboard</Link>

            {/* Admin Theme Toggle (Visible mostly in admin mode, but kept here for instruction demo) */}
            <button
              onClick={toggleAdminTheme}
              className="p-2 rounded-full bg-secondary/30 text-foreground hover:bg-secondary/50 transition-colors flex items-center justify-center border border-secondary/50"
              title="Toggle Admin Theme (Nvidia Light / AMD Dark)"
            >
              {adminTheme === "cyan" ? <Moon size={18} className="text-cyan-400" /> : <Sun size={18} className="text-amber-500" />}
            </button>

            <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium hover:opacity-90 transition-opacity">
              Get VIP
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md text-foreground/80 hover:text-primary hover:bg-secondary/30 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="md:hidden bg-background border-b border-secondary/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary/30">Services</Link>
            <Link href="#" className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary/30">Live Systems</Link>
            <Link href="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-foreground/80 hover:text-primary hover:bg-secondary/30">Dashboard</Link>

            <div className="px-3 py-2 flex items-center justify-between">
              <span className="text-base font-medium text-foreground/80">Admin Theme</span>
              <button onClick={toggleAdminTheme} className="p-2 rounded-full bg-secondary/30">
              {adminTheme === "cyan" ? <Moon size={18} className="text-cyan-400" /> : <Sun size={18} className="text-amber-500" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MegaMenu;

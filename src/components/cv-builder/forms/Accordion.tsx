'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface AccordionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Accordion({ title, defaultOpen = false, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4 border border-border/40 bg-card/20 rounded-md overflow-hidden transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center p-4 bg-secondary/10 hover:bg-secondary/20 transition-colors"
      >
        <span className="font-mono text-xs tracking-widest text-primary uppercase font-bold flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
          {title}
        </span>
        {isOpen ? <ChevronUp size={16} className="text-primary" /> : <ChevronDown size={16} className="text-foreground/50" />}
      </button>
      {isOpen && (
        <div className="p-4 border-t border-border/40 bg-background/50">
          {children}
        </div>
      )}
    </div>
  );
}

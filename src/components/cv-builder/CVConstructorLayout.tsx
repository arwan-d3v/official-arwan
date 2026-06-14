'use client';

import { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useCVStore } from './store';
import PersonalIdentityForm from './forms/PersonalIdentityForm';
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import AdditionalModulesForm from './forms/AdditionalModulesForm';
import { Accordion } from './forms/Accordion';
import { ATSTemplate } from './templates/ATSTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { LayoutTemplate, Lock, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function CVConstructorLayout({ 
  onSave, 
  isGuest = false,
  isVip = false
}: { 
  onSave?: (data: any, template: string) => Promise<void> | void;
  isGuest?: boolean;
  isVip?: boolean;
}) {
  const { data, templateType, setTemplateType } = useCVStore();
  const componentRef = useRef<HTMLDivElement>(null);
  
  // Enterprise UI States
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{type: 'success' | 'error' | 'warning', message: string} | null>(null);

  const reactToPrintFn = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalIdentity.fullName || 'Resume'}_CV`,
  });

  const showToast = (type: 'success' | 'error' | 'warning', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleSaveWrapper = async () => {
    if (isGuest) {
      showToast('warning', 'AUTH_REQUIRED: Please login to save your CV to the Vault.');
      return;
    }
    if (!onSave) return;
    
    setIsSaving(true);
    try {
      await onSave(data, templateType);
      showToast('success', 'SYS_SYNC: CV successfully saved to your Project Vault.');
    } catch (error: any) {
      showToast('error', `SYS_ERR: Failed to save CV. ${error.message || ''}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background text-foreground font-sans relative">
      
      {/* Enterprise Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className={`px-6 py-3 rounded-full shadow-xl flex items-center gap-3 font-mono text-xs uppercase font-bold tracking-wider backdrop-blur-md border ${
            toast.type === 'success' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
            toast.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
            'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
          }`}>
            {toast.type === 'success' && <CheckCircle2 size={16} />}
            {toast.type === 'error' && <AlertCircle size={16} />}
            {toast.type === 'warning' && <Lock size={16} />}
            {toast.message}
          </div>
        </div>
      )}

      {/* Left Pane - Editor */}
      <div className="w-1/2 h-full overflow-y-auto border-r border-border/40 flex flex-col scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
        {/* Header Section */}
        <div className="p-8 border-b border-border/40 bg-card/30 sticky top-0 z-10 backdrop-blur-md">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-primary font-mono text-xs flex items-center gap-2"><LayoutTemplate size={14}/> SYS_ARCHITECT</span>
            <span className="text-muted-foreground font-mono text-xs ml-auto">● SYS_ONLINE</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 text-primary mb-2 font-mono text-xs">
              <span>📄</span>
              <span>CV_CONSTRUCTOR_V2.1</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight mb-6 uppercase">Generate_Resume</h1>
            
            {/* Template Toggles */}
            <div className="flex bg-secondary/20 rounded-md p-1 border border-border/40 relative">
              <button
                onClick={() => setTemplateType('ATS_OPTIMIZED')}
                className={`flex-1 py-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded relative z-10 ${
                  templateType === 'ATS_OPTIMIZED' 
                    ? 'bg-card text-foreground shadow-sm font-bold border border-border/50' 
                    : 'text-foreground/50 hover:text-foreground hover:bg-secondary/30'
                }`}
              >
                ATS_OPTIMIZED
              </button>
              <button
                onClick={() => setTemplateType('MODERN_MINIMAL')}
                className={`flex-1 py-3 px-4 font-mono text-xs tracking-widest uppercase transition-all duration-300 rounded relative z-10 ${
                  templateType === 'MODERN_MINIMAL' 
                    ? 'bg-primary text-primary-foreground shadow-[0_0_15px_rgba(var(--primary),0.3)] font-bold' 
                    : 'text-foreground/50 hover:text-foreground hover:bg-secondary/30'
                }`}
              >
                MODERN_MINIMAL
              </button>
            </div>
          </div>
        </div>

        {/* Forms Section */}
        <div className="p-8 flex-1">
          <Accordion title="01_PERSONAL_IDENTITY" defaultOpen={true}>
            <PersonalIdentityForm />
          </Accordion>
          
          <Accordion title="02_WORK_EXPERIENCE">
            <ExperienceForm />
          </Accordion>

          <Accordion title="03_EDUCATION">
            <EducationForm />
          </Accordion>

          <Accordion title="04_CORE_MATRIX_SKILLS">
            <SkillsForm />
          </Accordion>

          <Accordion title="05_ADDITIONAL_MODULES">
            <AdditionalModulesForm />
          </Accordion>
        </div>

        {/* Footer Actions (Sticky) */}
        <div className="p-8 border-t border-border/40 flex justify-between items-center bg-card/80 backdrop-blur-md sticky bottom-0 z-10">
          <button className="text-foreground/50 font-mono text-xs uppercase hover:text-primary transition-colors flex items-center gap-1 group">
            <span className="group-hover:-translate-x-1 transition-transform">&lt;</span> Back_Sequence
          </button>
          
          <div className="flex gap-4">
            <button 
              onClick={() => reactToPrintFn()}
              className="px-6 py-3 bg-card border border-border/50 text-foreground font-mono text-xs uppercase hover:border-primary hover:text-primary transition-all shadow-sm"
            >
              Download_PDF
            </button>
            
            <button 
              onClick={handleSaveWrapper}
              disabled={isSaving}
              className={`px-6 py-3 font-mono text-xs uppercase font-bold transition-all shadow-sm flex items-center gap-2 ${
                isGuest 
                  ? 'bg-secondary/50 text-foreground/50 cursor-not-allowed border border-border/50' 
                  : 'bg-primary text-primary-foreground hover:shadow-[0_0_15px_rgba(var(--primary),0.4)] disabled:opacity-70 disabled:cursor-wait'
              }`}
            >
              {isSaving ? <Loader2 size={14} className="animate-spin" /> : (isGuest && <Lock size={14} />)}
              {isSaving ? 'Processing...' : (isGuest ? 'Login_To_Save' : 'Save_To_Vault')}
            </button>
          </div>
        </div>
      </div>

      {/* Right Pane - Live Preview (A4 Paper) */}
      <div className="w-1/2 h-full overflow-y-auto bg-secondary/10 flex items-start justify-center p-8 custom-scrollbar">
        {/* Render selected template, passing the ref to react-to-print */}
        <div className="shadow-2xl">
          {templateType === 'ATS_OPTIMIZED' ? (
            <ATSTemplate ref={componentRef} data={data} isVip={isVip} />
          ) : (
            <ModernTemplate ref={componentRef} data={data} isVip={isVip} />
          )}
        </div>
      </div>
    </div>
  );
}

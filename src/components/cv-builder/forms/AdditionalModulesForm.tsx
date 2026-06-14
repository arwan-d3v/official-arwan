'use client';

import { useCVStore } from '../store';
import { Plus, Trash2 } from 'lucide-react';

export default function AdditionalModulesForm() {
  const data = useCVStore((state) => state.data);
  const { socialLinks, certificates, courses, licenses, references } = data;
  
  const updateSocialLinks = useCVStore((state) => state.updateSocialLinks);
  const updateCertificates = useCVStore((state) => state.updateCertificates);
  const updateCourses = useCVStore((state) => state.updateCourses);
  const updateLicenses = useCVStore((state) => state.updateLicenses);
  const updateReferences = useCVStore((state) => state.updateReferences);

  const inputClassName = "w-full bg-secondary/20 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 text-sm text-foreground transition-all rounded";
  const labelClassName = "block text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider";

  // Generic Handlers
  const addArrayItem = (updateFn: any, array: any[], template: any) => {
    updateFn([...array, { id: crypto.randomUUID(), ...template }]);
  };

  const updateArrayItem = (updateFn: any, array: any[], id: string, field: string, value: string) => {
    updateFn(array.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeArrayItem = (updateFn: any, array: any[], id: string) => {
    updateFn(array.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-10">
      
      {/* ---------------- SOCIAL LINKS ---------------- */}
      <section>
        <h4 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block"></span> Digital_Footprint
        </h4>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClassName}>LinkedIn URL</label>
              <input
                type="text"
                value={socialLinks.linkedin}
                onChange={(e) => updateSocialLinks({ linkedin: e.target.value })}
                className={inputClassName}
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className={labelClassName}>GitHub URL</label>
              <input
                type="text"
                value={socialLinks.github}
                onChange={(e) => updateSocialLinks({ github: e.target.value })}
                className={inputClassName}
                placeholder="https://github.com/..."
              />
            </div>
          </div>
          <div>
            <label className={labelClassName}>Personal Website URL</label>
            <input
              type="text"
              value={socialLinks.website}
              onChange={(e) => updateSocialLinks({ website: e.target.value })}
              className={inputClassName}
              placeholder="https://..."
            />
          </div>
        </div>
      </section>

      {/* ---------------- CERTIFICATES ---------------- */}
      <section>
        <h4 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block"></span> Certifications
        </h4>
        <div className="space-y-4">
          {certificates.map((cert, i) => (
            <div key={cert.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
              <button onClick={() => removeArrayItem(updateCertificates, certificates, cert.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-3 pr-6">
                <div>
                  <label className={labelClassName}>Certificate Name</label>
                  <input type="text" value={cert.name} onChange={(e) => updateArrayItem(updateCertificates, certificates, cert.id, 'name', e.target.value)} className={inputClassName} placeholder="AWS Certified Solutions Architect" />
                </div>
                <div>
                  <label className={labelClassName}>Issuer</label>
                  <input type="text" value={cert.issuer} onChange={(e) => updateArrayItem(updateCertificates, certificates, cert.id, 'issuer', e.target.value)} className={inputClassName} placeholder="Amazon Web Services" />
                </div>
              </div>
              <div>
                <label className={labelClassName}>Date</label>
                <input type="text" value={cert.date} onChange={(e) => updateArrayItem(updateCertificates, certificates, cert.id, 'date', e.target.value)} className={inputClassName} placeholder="MMM YYYY" />
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem(updateCertificates, certificates, { name: '', issuer: '', date: '' })} className="w-full py-2 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 text-xs font-mono rounded">
            + Add Certificate
          </button>
        </div>
      </section>

      {/* ---------------- COURSES ---------------- */}
      <section>
        <h4 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block"></span> Courses
        </h4>
        <div className="space-y-4">
          {courses.map((course, i) => (
            <div key={course.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
              <button onClick={() => removeArrayItem(updateCourses, courses, course.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-3 pr-6">
                <div>
                  <label className={labelClassName}>Course Name</label>
                  <input type="text" value={course.name} onChange={(e) => updateArrayItem(updateCourses, courses, course.id, 'name', e.target.value)} className={inputClassName} placeholder="Advanced React Patterns" />
                </div>
                <div>
                  <label className={labelClassName}>Provider</label>
                  <input type="text" value={course.provider} onChange={(e) => updateArrayItem(updateCourses, courses, course.id, 'provider', e.target.value)} className={inputClassName} placeholder="Frontend Masters" />
                </div>
              </div>
              <div>
                <label className={labelClassName}>Date</label>
                <input type="text" value={course.date} onChange={(e) => updateArrayItem(updateCourses, courses, course.id, 'date', e.target.value)} className={inputClassName} placeholder="YYYY" />
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem(updateCourses, courses, { name: '', provider: '', date: '' })} className="w-full py-2 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 text-xs font-mono rounded">
            + Add Course
          </button>
        </div>
      </section>

      {/* ---------------- LICENSES ---------------- */}
      <section>
        <h4 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block"></span> Licenses
        </h4>
        <div className="space-y-4">
          {licenses.map((lic, i) => (
            <div key={lic.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
              <button onClick={() => removeArrayItem(updateLicenses, licenses, lic.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-3 pr-6">
                <div>
                  <label className={labelClassName}>License Name</label>
                  <input type="text" value={lic.name} onChange={(e) => updateArrayItem(updateLicenses, licenses, lic.id, 'name', e.target.value)} className={inputClassName} placeholder="CPA" />
                </div>
                <div>
                  <label className={labelClassName}>Issuer</label>
                  <input type="text" value={lic.issuer} onChange={(e) => updateArrayItem(updateLicenses, licenses, lic.id, 'issuer', e.target.value)} className={inputClassName} placeholder="Board of Accountancy" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClassName}>License Number</label>
                  <input type="text" value={lic.number} onChange={(e) => updateArrayItem(updateLicenses, licenses, lic.id, 'number', e.target.value)} className={inputClassName} placeholder="12345678" />
                </div>
                <div>
                  <label className={labelClassName}>Date</label>
                  <input type="text" value={lic.date} onChange={(e) => updateArrayItem(updateLicenses, licenses, lic.id, 'date', e.target.value)} className={inputClassName} placeholder="YYYY" />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem(updateLicenses, licenses, { name: '', issuer: '', number: '', date: '' })} className="w-full py-2 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 text-xs font-mono rounded">
            + Add License
          </button>
        </div>
      </section>

      {/* ---------------- REFERENCES ---------------- */}
      <section>
        <h4 className="text-primary font-mono text-xs mb-4 uppercase tracking-widest border-b border-border/50 pb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-primary inline-block"></span> References
        </h4>
        <div className="space-y-4">
          {references.map((ref, i) => (
            <div key={ref.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
              <button onClick={() => removeArrayItem(updateReferences, references, ref.id)} className="absolute top-3 right-3 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
              </button>
              <div className="grid grid-cols-2 gap-4 mb-3 pr-6">
                <div>
                  <label className={labelClassName}>Referent Name</label>
                  <input type="text" value={ref.name} onChange={(e) => updateArrayItem(updateReferences, references, ref.id, 'name', e.target.value)} className={inputClassName} placeholder="Jane Doe" />
                </div>
                <div>
                  <label className={labelClassName}>Company</label>
                  <input type="text" value={ref.company} onChange={(e) => updateArrayItem(updateReferences, references, ref.id, 'company', e.target.value)} className={inputClassName} placeholder="Tech Corp Inc." />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClassName}>Title</label>
                  <input type="text" value={ref.title} onChange={(e) => updateArrayItem(updateReferences, references, ref.id, 'title', e.target.value)} className={inputClassName} placeholder="Engineering Manager" />
                </div>
                <div>
                  <label className={labelClassName}>Contact Info</label>
                  <input type="text" value={ref.contact} onChange={(e) => updateArrayItem(updateReferences, references, ref.id, 'contact', e.target.value)} className={inputClassName} placeholder="jane@example.com / +1 234..." />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => addArrayItem(updateReferences, references, { name: '', title: '', company: '', contact: '' })} className="w-full py-2 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 text-xs font-mono rounded">
            + Add Reference
          </button>
        </div>
      </section>

    </div>
  );
}

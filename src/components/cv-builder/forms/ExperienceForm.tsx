'use client';

import { useCVStore } from '../store';
import { Plus, Trash2 } from 'lucide-react';

export default function ExperienceForm() {
  const { experience } = useCVStore((state) => state.data);
  const updateExperience = useCVStore((state) => state.updateExperience);

  const addExperience = () => {
    updateExperience([
      ...experience,
      {
        id: crypto.randomUUID(),
        company: '',
        title: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const updateField = (id: string, field: string, value: string | boolean) => {
    updateExperience(
      experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
    );
  };

  const removeExperience = (id: string) => {
    updateExperience(experience.filter(exp => exp.id !== id));
  };

  const inputClassName = "w-full bg-secondary/20 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 text-sm text-foreground transition-all rounded";
  const labelClassName = "block text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider";

  return (
    <div className="space-y-6">
      {experience.map((exp, index) => (
        <div key={exp.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
          <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-primary font-mono font-bold tracking-widest border border-border/50 rounded">
            ROLE_{index + 1}
          </div>
          <button
            onClick={() => removeExperience(exp.id)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove Role"
          >
            <Trash2 size={16} />
          </button>

          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Company Name</label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) => updateField(exp.id, 'company', e.target.value)}
                  className={inputClassName}
                  placeholder="Tech Corp Inc."
                />
              </div>
              <div>
                <label className={labelClassName}>Job Title</label>
                <input
                  type="text"
                  value={exp.title}
                  onChange={(e) => updateField(exp.id, 'title', e.target.value)}
                  className={inputClassName}
                  placeholder="Senior Developer"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Start Date</label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) => updateField(exp.id, 'startDate', e.target.value)}
                  className={inputClassName}
                  placeholder="MMM YYYY"
                />
              </div>
              <div>
                <div className="flex justify-between items-end mb-1">
                  <label className="block text-[10px] text-muted-foreground font-mono uppercase tracking-wider">End Date</label>
                  <label className="flex items-center gap-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={exp.current}
                      onChange={(e) => updateField(exp.id, 'current', e.target.checked)}
                      className="accent-primary w-3 h-3"
                    />
                    <span className="text-[9px] text-muted-foreground font-mono uppercase">Current</span>
                  </label>
                </div>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) => updateField(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className={`${inputClassName} ${exp.current ? 'opacity-50 cursor-not-allowed bg-secondary/5' : ''}`}
                  placeholder="MMM YYYY"
                />
              </div>
            </div>

            <div>
              <label className={labelClassName}>Description & Achievements</label>
              <textarea
                value={exp.description}
                onChange={(e) => updateField(exp.id, 'description', e.target.value)}
                rows={4}
                className={`${inputClassName} resize-none`}
                placeholder="• Led a team of 5 developers...&#10;• Improved performance by 40%..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addExperience}
        className="w-full py-3 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest rounded"
      >
        <Plus size={16} /> Add_Experience
      </button>
    </div>
  );
}

'use client';

import { useCVStore } from '../store';
import { Plus, Trash2 } from 'lucide-react';

export default function EducationForm() {
  const { education } = useCVStore((state) => state.data);
  const updateEducation = useCVStore((state) => state.updateEducation);

  const addEducation = () => {
    updateEducation([
      ...education,
      {
        id: crypto.randomUUID(),
        institution: '',
        degree: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      }
    ]);
  };

  const updateField = (id: string, field: string, value: string) => {
    updateEducation(
      education.map(edu => edu.id === id ? { ...edu, [field]: value } : edu)
    );
  };

  const removeEducation = (id: string) => {
    updateEducation(education.filter(edu => edu.id !== id));
  };

  const inputClassName = "w-full bg-secondary/20 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 text-sm text-foreground transition-all rounded";
  const labelClassName = "block text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider";

  return (
    <div className="space-y-6">
      {education.map((edu, index) => (
        <div key={edu.id} className="p-4 border border-border/50 bg-secondary/10 rounded relative group transition-all hover:border-border">
          <div className="absolute -top-3 left-4 bg-background px-2 text-[10px] text-primary font-mono font-bold tracking-widest border border-border/50 rounded">
            DEGREE_{index + 1}
          </div>
          <button
            onClick={() => removeEducation(edu.id)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            title="Remove Education"
          >
            <Trash2 size={16} />
          </button>

          <div className="space-y-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Institution</label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => updateField(edu.id, 'institution', e.target.value)}
                  className={inputClassName}
                  placeholder="University of Technology"
                />
              </div>
              <div>
                <label className={labelClassName}>Degree</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => updateField(edu.id, 'degree', e.target.value)}
                  className={inputClassName}
                  placeholder="Bachelor of Computer Science"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClassName}>Start Date</label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) => updateField(edu.id, 'startDate', e.target.value)}
                  className={inputClassName}
                  placeholder="YYYY"
                />
              </div>
              <div>
                <label className={labelClassName}>End Date</label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) => updateField(edu.id, 'endDate', e.target.value)}
                  className={inputClassName}
                  placeholder="YYYY or Present"
                />
              </div>
            </div>

            <div>
              <label className={labelClassName}>Additional Details (Optional)</label>
              <textarea
                value={edu.description || ''}
                onChange={(e) => updateField(edu.id, 'description', e.target.value)}
                rows={2}
                className={`${inputClassName} resize-none`}
                placeholder="GPA, Honors, relevant coursework..."
              />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="w-full py-3 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest rounded"
      >
        <Plus size={16} /> Add_Education
      </button>
    </div>
  );
}

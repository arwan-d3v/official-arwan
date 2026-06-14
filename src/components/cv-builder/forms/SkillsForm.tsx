'use client';

import { useCVStore } from '../store';
import { Plus, Trash2 } from 'lucide-react';

export default function SkillsForm() {
  const { skills } = useCVStore((state) => state.data);
  const updateSkills = useCVStore((state) => state.updateSkills);

  const addSkill = () => {
    updateSkills([
      ...skills,
      {
        id: crypto.randomUUID(),
        name: '',
        level: 50
      }
    ]);
  };

  const updateField = (id: string, field: string, value: string | number) => {
    updateSkills(
      skills.map(skill => skill.id === id ? { ...skill, [field]: value } : skill)
    );
  };

  const removeSkill = (id: string) => {
    updateSkills(skills.filter(skill => skill.id !== id));
  };

  const inputClassName = "w-full bg-secondary/20 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 text-sm text-foreground transition-all rounded";

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={skill.id} className="flex items-center gap-4 p-3 border border-border/50 bg-secondary/10 rounded group transition-all hover:border-border">
          <div className="flex-1">
            <input
              type="text"
              value={skill.name}
              onChange={(e) => updateField(skill.id, 'name', e.target.value)}
              className={inputClassName}
              placeholder={`Skill ${index + 1} (e.g. React.js)`}
            />
          </div>
          <div className="w-1/3 flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="100"
              value={skill.level}
              onChange={(e) => updateField(skill.id, 'level', parseInt(e.target.value))}
              className="w-full accent-primary"
            />
            <span className="text-xs text-primary font-mono w-8 text-right">{skill.level}%</span>
          </div>
          <button
            onClick={() => removeSkill(skill.id)}
            className="text-muted-foreground hover:text-destructive opacity-50 group-hover:opacity-100 transition-opacity"
            title="Remove Skill"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        onClick={addSkill}
        className="w-full py-3 border border-dashed border-border/50 text-muted-foreground hover:text-primary hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-widest rounded"
      >
        <Plus size={16} /> Add_Skill_Node
      </button>
    </div>
  );
}

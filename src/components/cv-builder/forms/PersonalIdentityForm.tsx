'use client';

import { useCVStore } from '../store';
import { UploadCloud, X } from 'lucide-react';
import { useRef, useState } from 'react';
import ImageCropper from './ImageCropper';

export default function PersonalIdentityForm() {
  const { personalIdentity } = useCVStore((state) => state.data);
  const updatePersonalIdentity = useCVStore((state) => state.updatePersonalIdentity);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uncroppedImage, setUncroppedImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (field: string, value: string | boolean) => {
    updatePersonalIdentity({ [field]: value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      setErrorMsg("Image size exceeds 2MB limit. Please choose a smaller file.");
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUncroppedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    
    // Reset input so the same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleCropComplete = (croppedBase64: string) => {
    updatePersonalIdentity({ photoUrl: croppedBase64 });
    setUncroppedImage(null);
  };

  const removePhoto = () => {
    updatePersonalIdentity({ photoUrl: undefined });
  };

  const inputClassName = "w-full bg-secondary/20 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none px-3 py-2 text-sm text-foreground transition-all rounded";
  const labelClassName = "block text-[10px] text-muted-foreground font-mono mb-1 uppercase tracking-wider";

  return (
    <div className="space-y-6">
      {uncroppedImage && (
        <ImageCropper 
          imageSrc={uncroppedImage} 
          onCropComplete={handleCropComplete} 
          onCancel={() => setUncroppedImage(null)} 
        />
      )}

      {/* Photo Upload & Options */}
      <div className="border border-border/50 p-4 bg-secondary/10 rounded">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-lg border border-border/50 bg-secondary/30 overflow-hidden flex-shrink-0 flex items-center justify-center relative group">
            {personalIdentity.photoUrl ? (
              <>
                <img src={personalIdentity.photoUrl} alt="Profile" className="w-full h-full object-cover" />
                <button 
                  onClick={removePhoto}
                  className="absolute inset-0 bg-black/60 text-destructive opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <UploadCloud size={24} className="text-muted-foreground" />
            )}
          </div>
          <div className="flex-1">
            <label className={labelClassName}>Profile Photo</label>
            <input 
              type="file" 
              accept="image/png, image/jpeg, image/webp" 
              className="text-xs text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-xs file:font-mono file:bg-primary/20 file:text-primary hover:file:bg-primary hover:file:text-primary-foreground transition-colors cursor-pointer"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
            <p className="text-[10px] text-muted-foreground mt-2 font-mono">JPG, PNG, WEBP (Max 2MB)</p>
            {errorMsg && (
              <p className="text-[10px] text-destructive mt-1 font-mono bg-destructive/10 p-1 rounded inline-block border border-destructive/20">{errorMsg}</p>
            )}
          </div>
        </div>

        {/* Photo Settings */}
        {personalIdentity.photoUrl && (
          <div className="grid grid-cols-2 gap-4 border-t border-border/50 pt-4 mt-2">
            <div>
              <label className={labelClassName}>Frame Shape</label>
              <div className="flex bg-secondary/20 border border-border/50 p-1 rounded">
                <button 
                  onClick={() => handleChange('photoShape', 'round')}
                  className={`flex-1 text-xs py-1.5 font-mono uppercase rounded transition-all ${personalIdentity.photoShape === 'round' ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}`}
                >
                  Round
                </button>
                <button 
                  onClick={() => handleChange('photoShape', 'square')}
                  className={`flex-1 text-xs py-1.5 font-mono uppercase rounded transition-all ${personalIdentity.photoShape === 'square' ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}`}
                >
                  Square
                </button>
              </div>
            </div>
            <div>
              <label className={labelClassName}>Frame Outline</label>
              <div className="flex bg-secondary/20 border border-border/50 p-1 rounded">
                <button 
                  onClick={() => handleChange('photoOutline', true)}
                  className={`flex-1 text-xs py-1.5 font-mono uppercase rounded transition-all ${personalIdentity.photoOutline ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}`}
                >
                  On
                </button>
                <button 
                  onClick={() => handleChange('photoOutline', false)}
                  className={`flex-1 text-xs py-1.5 font-mono uppercase rounded transition-all ${!personalIdentity.photoOutline ? 'bg-primary text-primary-foreground font-bold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-secondary/40'}`}
                >
                  Off
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Full Name</label>
          <input
            type="text"
            value={personalIdentity.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className={inputClassName}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label className={labelClassName}>Email</label>
          <input
            type="email"
            value={personalIdentity.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClassName}
            placeholder="john.doe@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClassName}>Location</label>
          <input
            type="text"
            value={personalIdentity.location}
            onChange={(e) => handleChange('location', e.target.value)}
            className={inputClassName}
            placeholder="San Francisco, CA"
          />
        </div>
        <div>
          <label className={labelClassName}>Phone</label>
          <input
            type="tel"
            value={personalIdentity.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={inputClassName}
            placeholder="+1 555-0199"
          />
        </div>
      </div>

      <div>
        <label className={labelClassName}>Professional Title</label>
        <input
          type="text"
          value={personalIdentity.professionalTitle}
          onChange={(e) => handleChange('professionalTitle', e.target.value)}
          className={inputClassName}
          placeholder="Software Engineer"
        />
      </div>

      <div>
        <label className={labelClassName}>Professional Summary</label>
        <textarea
          value={personalIdentity.professionalSummary}
          onChange={(e) => handleChange('professionalSummary', e.target.value)}
          rows={4}
          className={`${inputClassName} resize-none`}
          placeholder="Experienced software engineer specializing in..."
        />
      </div>
    </div>
  );
}

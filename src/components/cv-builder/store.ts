import { create } from 'zustand';
import { CVData, defaultCVData, TemplateType } from './types';

interface CVStore {
  data: CVData;
  templateType: TemplateType;
  updatePersonalIdentity: (fields: Partial<CVData['personalIdentity']>) => void;
  updateSocialLinks: (fields: Partial<CVData['socialLinks']>) => void;
  updateExperience: (experience: CVData['experience']) => void;
  updateEducation: (education: CVData['education']) => void;
  updateSkills: (skills: CVData['skills']) => void;
  updateCertificates: (certificates: CVData['certificates']) => void;
  updateCourses: (courses: CVData['courses']) => void;
  updateLicenses: (licenses: CVData['licenses']) => void;
  updateReferences: (references: CVData['references']) => void;
  setTemplateType: (type: TemplateType) => void;
  setAllData: (data: CVData) => void;
}

export const useCVStore = create<CVStore>((set) => ({
  data: defaultCVData,
  templateType: 'ATS_OPTIMIZED',
  
  updatePersonalIdentity: (fields) => set((state) => ({
    data: {
      ...state.data,
      personalIdentity: { ...state.data.personalIdentity, ...fields }
    }
  })),

  updateSocialLinks: (fields) => set((state) => ({
    data: {
      ...state.data,
      socialLinks: { ...state.data.socialLinks, ...fields }
    }
  })),

  updateExperience: (experience) => set((state) => ({
    data: { ...state.data, experience }
  })),

  updateEducation: (education) => set((state) => ({
    data: { ...state.data, education }
  })),

  updateSkills: (skills) => set((state) => ({
    data: { ...state.data, skills }
  })),

  updateCertificates: (certificates) => set((state) => ({
    data: { ...state.data, certificates }
  })),

  updateCourses: (courses) => set((state) => ({
    data: { ...state.data, courses }
  })),

  updateLicenses: (licenses) => set((state) => ({
    data: { ...state.data, licenses }
  })),

  updateReferences: (references) => set((state) => ({
    data: { ...state.data, references }
  })),

  setTemplateType: (templateType) => set({ templateType }),
  
  setAllData: (data) => set({ data }),
}));

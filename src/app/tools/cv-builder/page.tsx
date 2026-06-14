import CVConstructorLayout from '@/components/cv-builder/CVConstructorLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CV Constructor | Antigravity',
  description: 'Generate ATS-Optimized and Modern Minimal resumes instantly.',
};

export default function PublicCVBuilderPage() {
  return (
    <main className="min-h-screen bg-black">
      <CVConstructorLayout isGuest={true} />
    </main>
  );
}

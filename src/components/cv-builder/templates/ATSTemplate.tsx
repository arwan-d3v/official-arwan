import { forwardRef } from 'react';
import { CVData } from '../types';

interface TemplateProps {
  data: CVData;
  isVip?: boolean;
}

export const ATSTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, isVip = false }, ref) => {
  const { personalIdentity, socialLinks, experience, education, skills, certificates, courses, licenses, references } = data;

  const getContactString = () => {
    const parts = [];
    if (personalIdentity.location) parts.push(personalIdentity.location);
    if (personalIdentity.phone) parts.push(personalIdentity.phone);
    if (personalIdentity.email) parts.push(personalIdentity.email);
    if (socialLinks.linkedin) parts.push(socialLinks.linkedin.replace('https://', ''));
    if (socialLinks.github) parts.push(socialLinks.github.replace('https://', ''));
    if (socialLinks.website) parts.push(socialLinks.website.replace('https://', ''));
    return parts.join(' • ');
  };

  return (
    <div 
      ref={ref}
      className="bg-white w-[210mm] min-h-[297mm] p-[20mm] mx-auto text-black font-serif shadow-lg relative print:shadow-none print:w-full print:h-full print:p-8"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Header */}
      <header className="text-center mb-6 print:break-inside-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-widest mb-1">
          {personalIdentity.fullName || 'YOUR NAME'}
        </h1>
        <div className="text-sm flex flex-wrap justify-center items-center gap-1 text-gray-800">
          {getContactString()}
        </div>
      </header>

      {/* Summary */}
      {personalIdentity.professionalSummary && (
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-2">
            Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-800 text-justify">
            {personalIdentity.professionalSummary}
          </p>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx} className="print:break-inside-avoid">
                <div className="flex justify-between items-baseline font-bold text-sm mb-1">
                  <h3>{exp.title}</h3>
                  <span className="text-xs font-normal">
                    {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-baseline text-sm italic mb-2 text-gray-800">
                  <span>{exp.company}</span>
                  <span className="text-xs">{exp.location}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-800 whitespace-pre-wrap text-justify">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Technical Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6 print:break-inside-avoid">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="text-sm text-gray-800 leading-relaxed text-justify">
            <span className="font-bold">Expertise: </span>
            {skills.map(s => s.name).join(', ')}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-sm print:break-inside-avoid">
                <div>
                  <span className="font-bold">{edu.institution}</span>
                  {edu.degree && <span>, {edu.degree}</span>}
                </div>
                <span className="text-xs">{edu.endDate || edu.startDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certificates & Licenses */}
      {(certificates.length > 0 || licenses.length > 0) && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            Certifications & Licenses
          </h2>
          <div className="space-y-2">
            {certificates.map((cert, idx) => (
              <div key={`cert-${idx}`} className="flex justify-between items-baseline text-sm print:break-inside-avoid">
                <div>
                  <span className="font-bold">{cert.name}</span>
                  {cert.issuer && <span>, {cert.issuer}</span>}
                </div>
                <span className="text-xs">{cert.date}</span>
              </div>
            ))}
            {licenses.map((lic, idx) => (
              <div key={`lic-${idx}`} className="flex justify-between items-baseline text-sm print:break-inside-avoid">
                <div>
                  <span className="font-bold">{lic.name}</span>
                  {lic.number && <span> (License: {lic.number})</span>}
                  {lic.issuer && <span>, {lic.issuer}</span>}
                </div>
                <span className="text-xs">{lic.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Courses */}
      {courses.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            Courses & Training
          </h2>
          <div className="space-y-2">
            {courses.map((course, idx) => (
              <div key={idx} className="flex justify-between items-baseline text-sm print:break-inside-avoid">
                <div>
                  <span className="font-bold">{course.name}</span>
                  {course.provider && <span>, {course.provider}</span>}
                </div>
                <span className="text-xs">{course.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* References */}
      {references.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-wider border-b-2 border-black pb-1 mb-3">
            References
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {references.map((ref, idx) => (
              <div key={idx} className="text-sm print:break-inside-avoid">
                <div className="font-bold">{ref.name}</div>
                <div className="italic text-gray-800">{ref.title}, {ref.company}</div>
                <div className="text-gray-600 text-xs">{ref.contact}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Print Copyright / Watermark */}
      {!isVip && (
        <div className="hidden print:block absolute bottom-2 right-4 text-[10px] text-gray-400 font-sans opacity-70">
          Made with official-arwan.info
        </div>
      )}
    </div>
  );
});

ATSTemplate.displayName = 'ATSTemplate';

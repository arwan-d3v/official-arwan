import { forwardRef } from 'react';
import { CVData } from '../types';
import { User, Mail, Phone, MapPin, Globe, Link } from 'lucide-react';

interface TemplateProps {
  data: CVData;
  isVip?: boolean;
}

export const ModernTemplate = forwardRef<HTMLDivElement, TemplateProps>(({ data, isVip = false }, ref) => {
  const { personalIdentity, socialLinks, experience, education, skills, certificates, courses, licenses, references } = data;

  return (
    <div 
      ref={ref}
      className="bg-white w-[210mm] min-h-[297mm] mx-auto text-gray-800 font-sans flex shadow-lg relative print:shadow-none print:w-full print:h-full"
      style={{ boxSizing: 'border-box' }}
    >
      {/* Left Sidebar */}
      <div className="w-1/3 bg-slate-50 border-r border-slate-200 p-8 flex flex-col">
        {/* Profile Avatar Placeholder / Photo */}
        <div 
          className={`w-24 h-24 bg-white mx-auto mb-6 flex items-center justify-center text-slate-300 overflow-hidden print:break-inside-avoid ${personalIdentity.photoShape === 'square' ? 'rounded-lg' : 'rounded-full'} ${personalIdentity.photoOutline ? 'border-2 border-slate-200' : 'border-none'}`}
        >
          {personalIdentity.photoUrl ? (
            <img src={personalIdentity.photoUrl} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <User size={40} />
          )}
        </div>

        {/* Identity */}
        <div className="text-center mb-10 print:break-inside-avoid">
          <h1 className="text-xl font-bold uppercase tracking-wider text-slate-900 mb-1">
            {personalIdentity.fullName || 'YOUR NAME'}
          </h1>
          <h2 className="text-[10px] font-semibold uppercase tracking-widest text-primary print:brightness-75">
            {personalIdentity.professionalTitle || 'Professional Title'}
          </h2>
        </div>

        {/* Contact */}
        <div className="mb-10 print:break-inside-avoid">
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-2">
            Contact
          </h3>
          <ul className="space-y-4 text-xs">
            {personalIdentity.email && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><Mail size={12}/> Email</span>
                <span className="break-all">{personalIdentity.email}</span>
              </li>
            )}
            {personalIdentity.phone && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><Phone size={12}/> Phone</span>
                <span>{personalIdentity.phone}</span>
              </li>
            )}
            {personalIdentity.location && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><MapPin size={12}/> Location</span>
                <span>{personalIdentity.location}</span>
              </li>
            )}
            {socialLinks.website && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><Globe size={12}/> Website</span>
                <span className="break-all">{socialLinks.website.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
              </li>
            )}
            {socialLinks.linkedin && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><Link size={12}/> LinkedIn</span>
                <span className="break-all">{socialLinks.linkedin.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
              </li>
            )}
            {socialLinks.github && (
              <li className="flex flex-col">
                <span className="text-slate-500 font-medium uppercase text-[9px] tracking-wider mb-1 flex items-center gap-1"><Link size={12}/> GitHub</span>
                <span className="break-all">{socialLinks.github.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
              </li>
            )}
          </ul>
        </div>

        {/* Core Matrix (Skills) */}
        {skills.length > 0 && (
          <div className="print:break-inside-avoid">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-900 mb-4 border-b border-slate-200 pb-2">
              Core Matrix
            </h3>
            <div className="space-y-4">
              {skills.map((skill, idx) => (
                <div key={idx} className="flex flex-col">
                  <div className="flex justify-between text-[10px] mb-1 font-semibold">
                    <span>{skill.name}</span>
                    <span className="text-slate-400">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary print:brightness-75 h-full rounded-full" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Content */}
      <div className="w-2/3 p-10 flex flex-col">
        {/* Summary */}
        {personalIdentity.professionalSummary && (
          <section className="mb-10 print:break-inside-avoid">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-primary print:brightness-75" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary print:brightness-75">
                Executive_Summary
              </h3>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-700 text-justify">
              {personalIdentity.professionalSummary}
            </p>
          </section>
        )}

        {/* Experience Timeline */}
        {experience.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary print:brightness-75" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary print:brightness-75">
                Professional_Timeline
              </h3>
            </div>
            
            <div className="relative border-l border-slate-200 ml-3 pl-6 space-y-8">
              {experience.map((exp, idx) => (
                <div key={idx} className="relative print:break-inside-avoid">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-slate-900">{exp.title}</h4>
                    <span className="text-[9px] text-slate-400 tracking-wider font-mono">
                      {exp.startDate} &ndash; {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <h5 className="text-[11px] text-primary print:brightness-75 font-semibold mb-2">{exp.company}</h5>
                  <p className="text-[11px] leading-relaxed text-slate-600 whitespace-pre-wrap text-justify">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary print:brightness-75" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary print:brightness-75">
                Academic_History
              </h3>
            </div>
            
            <div className="relative border-l border-slate-200 ml-3 pl-6 space-y-6">
              {education.map((edu, idx) => (
                <div key={idx} className="relative print:break-inside-avoid">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[12px] font-bold text-slate-900">{edu.degree}</h4>
                    <span className="text-[9px] text-slate-400 tracking-wider font-mono">
                      {edu.endDate || edu.startDate}
                    </span>
                  </div>
                  <h5 className="text-[11px] text-slate-600">{edu.institution}</h5>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications & Courses */}
        {(certificates.length > 0 || courses.length > 0 || licenses.length > 0) && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary print:brightness-75" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary print:brightness-75">
                Licenses_&_Certifications
              </h3>
            </div>
            
            <div className="relative border-l border-slate-200 ml-3 pl-6 space-y-4">
              {certificates.map((cert, idx) => (
                <div key={`cert-${idx}`} className="relative print:break-inside-avoid">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[12px] font-bold text-slate-900">{cert.name}</h4>
                    <span className="text-[9px] text-slate-400 tracking-wider font-mono">{cert.date}</span>
                  </div>
                  <h5 className="text-[11px] text-slate-600">Issuer: {cert.issuer}</h5>
                </div>
              ))}
              {licenses.map((lic, idx) => (
                <div key={`lic-${idx}`} className="relative print:break-inside-avoid">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[12px] font-bold text-slate-900">{lic.name}</h4>
                    <span className="text-[9px] text-slate-400 tracking-wider font-mono">{lic.date}</span>
                  </div>
                  <h5 className="text-[11px] text-slate-600">License: {lic.number} | {lic.issuer}</h5>
                </div>
              ))}
              {courses.map((course, idx) => (
                <div key={`course-${idx}`} className="relative print:break-inside-avoid">
                  <div className="absolute -left-[29px] top-1 w-2 h-2 rounded-full bg-white border-2 border-slate-300" />
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-[12px] font-bold text-slate-900">{course.name}</h4>
                    <span className="text-[9px] text-slate-400 tracking-wider font-mono">{course.date}</span>
                  </div>
                  <h5 className="text-[11px] text-slate-600">Provider: {course.provider}</h5>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references.length > 0 && (
          <section>
            <div className="flex items-center gap-2 mb-6">
              <div className="w-2 h-2 rounded-full bg-primary print:brightness-75" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary print:brightness-75">
                References
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4 pl-3">
              {references.map((ref, idx) => (
                <div key={idx} className="print:break-inside-avoid">
                  <h4 className="text-[12px] font-bold text-slate-900">{ref.name}</h4>
                  <p className="text-[11px] text-slate-600 italic">{ref.title}, {ref.company}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{ref.contact}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Print Copyright / Watermark */}
      {!isVip && (
        <div className="hidden print:block absolute bottom-2 right-4 text-[10px] text-slate-400 font-sans opacity-70">
          Made with official-arwan.info
        </div>
      )}
    </div>
  );
});

ModernTemplate.displayName = 'ModernTemplate';

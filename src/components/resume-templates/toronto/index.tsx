// src/components/resume-templates/toronto/index.tsx
import React from 'react';
import { ResumeTemplateProps } from '../types';
import { torontoConfig } from '../configs/toronto';

const TorontoTemplate: React.FC<ResumeTemplateProps> = ({ data, variant }) => {
 const { colors, fontSizes } = torontoConfig;

 return (
   <div 
     className={`max-w-[850px] mx-auto`}
     style={{ backgroundColor: colors.background }}
   >
     {/* Cabeçalho com informações pessoais */}
     <header className="mb-8">
       <h1 
         className="font-bold mb-4"
         style={{ 
           color: colors.primary,
           fontSize: fontSizes.name
         }}
       >
         {data.personalInfo.fullName}
       </h1>
       <div className="space-y-1" style={{ color: colors.text }}>
         {data.personalInfo.email && (
           <div>{data.personalInfo.email}</div>
         )}
         {data.personalInfo.phone && (
           <div>{data.personalInfo.phone}</div>
         )}
         {data.personalInfo.address && (
           <div>{data.personalInfo.address}</div>
         )}
         {data.personalInfo.linkedin && (
           <div>LinkedIn: {data.personalInfo.linkedin}</div>
         )}
         {data.personalInfo.website && (
           <div>Website: {data.personalInfo.website}</div>
         )}
       </div>
     </header>

     {/* Resumo Profissional */}
     {data.professionalSummary && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Professional Summary
         </h2>
         <p style={{ color: colors.text }}>
           {data.professionalSummary.summary}
         </p>
       </section>
     )}

     {/* Experiência Profissional */}
     {data.workExperiences.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Work Experience
         </h2>
         <div className="space-y-6">
           {data.workExperiences.map((experience, index) => (
             <div key={index}>
               <h3 
                 className="font-semibold"
                 style={{ 
                   color: colors.text,
                   fontSize: fontSizes.subsectionTitle
                 }}
               >
                 {experience.position}
               </h3>
               <div 
                 className="font-semibold"
                 style={{ color: colors.secondary }}
               >
                 {experience.company}
               </div>
               <div style={{ color: colors.text }}>
                 {new Date(experience.startDate).toLocaleDateString('en-US', { 
                   month: 'long', 
                   year: 'numeric' 
                 })} - {
                   experience.endDate 
                     ? new Date(experience.endDate).toLocaleDateString('en-US', { 
                         month: 'long', 
                         year: 'numeric' 
                       })
                     : 'Present'
                 }
               </div>
               <p 
                 className="mt-2 whitespace-pre-line"
                 style={{ 
                   color: colors.text,
                   fontSize: fontSizes.normal
                 }}
               >
                 {experience.description}
               </p>
             </div>
           ))}
         </div>
       </section>
     )}

     {/* Educação */}
     {data.educations.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Education
         </h2>
         <div className="space-y-4">
           {data.educations.map((education, index) => (
             <div key={index}>
               <h3 
                 className="font-semibold"
                 style={{ 
                   color: colors.text,
                   fontSize: fontSizes.subsectionTitle
                 }}
               >
                 {education.degree} in {education.fieldOfStudy}
               </h3>
               <div style={{ color: colors.secondary }}>
                 {education.institution}
               </div>
               <div style={{ color: colors.text }}>
                 {new Date(education.startDate).toLocaleDateString('en-US', { 
                   month: 'long', 
                   year: 'numeric' 
                 })} - {
                   education.endDate 
                     ? new Date(education.endDate).toLocaleDateString('en-US', { 
                         month: 'long', 
                         year: 'numeric' 
                       })
                     : 'Present'
                 }
               </div>
             </div>
           ))}
         </div>
       </section>
     )}

     {/* Skills */}
     {data.skills.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Skills
         </h2>
         <div className="flex flex-wrap gap-2">
           {data.skills.map((skill, index) => (
             <div 
               key={index} 
               style={{ 
                 color: colors.text,
                 fontSize: fontSizes.normal
               }}
             >
               {skill.name} ({skill.level.toLowerCase()})
             </div>
           ))}
         </div>
       </section>
     )}

     {/* Languages */}
     {data.languages.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Languages
         </h2>
         <div className="flex flex-wrap gap-4">
           {data.languages.map((language, index) => (
             <div 
               key={index} 
               style={{ 
                 color: colors.text,
                 fontSize: fontSizes.normal
               }}
             >
               {language.name} - {language.level.toLowerCase()}
             </div>
           ))}
         </div>
       </section>
     )}

     {/* Certifications */}
     {data.certifications.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Certifications
         </h2>
         <div className="space-y-2">
           {data.certifications.map((cert, index) => (
             <div key={index}>
               <div 
                 className="font-semibold"
                 style={{ 
                   color: colors.text,
                   fontSize: fontSizes.subsectionTitle
                 }}
               >
                 {cert.name}
               </div>
               <div style={{ color: colors.secondary }}>
                 {cert.issuer} - {new Date(cert.date).toLocaleDateString('en-US', { 
                   month: 'long', 
                   year: 'numeric' 
                 })}
               </div>
             </div>
           ))}
         </div>
       </section>
     )}

     {/* Projects */}
     {data.projects.length > 0 && (
       <section className="mb-8">
         <h2 
           className="font-semibold mb-3"
           style={{ 
             color: colors.primary,
             fontSize: fontSizes.sectionTitle
           }}
         >
           Projects
         </h2>
         <div className="space-y-4">
           {data.projects.map((project, index) => (
             <div key={index}>
               <h3 
                 className="font-semibold"
                 style={{ 
                   color: colors.text,
                   fontSize: fontSizes.subsectionTitle
                 }}
               >
                 {project.name}
               </h3>
               <p style={{ color: colors.text }}>
                 {project.description}
               </p>
               {project.url && (
                 <a 
                   href={project.url} 
                   className="hover:underline"
                   style={{ color: colors.primary }}
                   target="_blank" 
                   rel="noopener noreferrer"
                 >
                   Project Link
                 </a>
               )}
             </div>
           ))}
         </div>
       </section>
     )}
   </div>
 );
};

export default TorontoTemplate;
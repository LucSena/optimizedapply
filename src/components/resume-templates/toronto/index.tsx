// src/components/resume-templates/toronto/index.tsx
import React from 'react';
import { ResumeTemplateProps } from '../types';
import { torontoConfig } from '../configs/toronto';

const TorontoTemplate: React.FC<ResumeTemplateProps> = ({ data, variant }) => {
  const { colors, fontSizes } = torontoConfig;

  return (
    <div className={`max-w-[850px] mx-auto bg-white p-8 ${
      variant === 'preview' ? 'scale-75 transform-origin-top' : ''
    }`}>
      {/* Cabeçalho com informações pessoais */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-4">
          {data.personalInfo.fullName}
        </h1>
        <div className="text-gray-600 space-y-1">
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
          <h2 className="text-2xl font-semibold text-primary mb-3">Professional Summary</h2>
          <p className="text-gray-700">
            {data.professionalSummary.summary}
          </p>
        </section>
      )}

      {/* Experiência Profissional */}
      {data.workExperiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-3">Work Experience</h2>
          <div className="space-y-6">
            {data.workExperiences.map((experience, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold">{experience.position}</h3>
                <div className="text-gray-600 font-semibold">{experience.company}</div>
                <div className="text-gray-500">
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
                <p className="mt-2 text-gray-700 whitespace-pre-line">
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
          <h2 className="text-2xl font-semibold text-primary mb-3">Education</h2>
          <div className="space-y-4">
            {data.educations.map((education, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold">{education.degree} in {education.fieldOfStudy}</h3>
                <div className="text-gray-600">{education.institution}</div>
                <div className="text-gray-500">
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
          <h2 className="text-2xl font-semibold text-primary mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => (
              <div key={index} className="text-gray-700">
                {skill.name} ({skill.level.toLowerCase()})
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-3">Languages</h2>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((language, index) => (
              <div key={index} className="text-gray-700">
                {language.name} - {language.level.toLowerCase()}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {data.certifications.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-3">Certifications</h2>
          <div className="space-y-2">
            {data.certifications.map((cert, index) => (
              <div key={index}>
                <div className="font-semibold text-gray-700">{cert.name}</div>
                <div className="text-gray-600">
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
          <h2 className="text-2xl font-semibold text-primary mb-3">Projects</h2>
          <div className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index}>
                <h3 className="text-xl font-semibold">{project.name}</h3>
                <p className="text-gray-700">{project.description}</p>
                {project.url && (
                  <a href={project.url} 
                     className="text-primary hover:underline"
                     target="_blank" 
                     rel="noopener noreferrer">
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
// src/components/resume/template-preview-data.ts
import { ResumeTemplateData } from '../resume-templates/types';

export const previewData: ResumeTemplateData = {
  personalInfo: {
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 890",
    linkedin: "linkedin.com/in/johndoe",
  },
  professionalSummary: {
    summary: "Experienced software engineer with expertise in web development and cloud technologies.",
  },
  workExperiences: [
    {
      company: "Tech Corp",
      position: "Senior Developer",
      startDate: new Date("2020-01-01"),
      endDate: new Date("2023-12-31"),
      description: "Led development team, implemented key features, improved performance.",
    },
  ],
  educations: [
    {
      institution: "University of Technology",
      degree: "Bachelor",
      fieldOfStudy: "Computer Science",
      startDate: new Date("2016-01-01"),
      endDate: new Date("2020-01-01"),
    },
  ],
  skills: [
    { name: "JavaScript", level: "EXPERT" },
    { name: "React", level: "ADVANCED" },
    { name: "Node.js", level: "ADVANCED" },
  ],
  projects: [],
  languages: [
    { name: "English", level: "NATIVE" },
    { name: "Spanish", level: "INTERMEDIATE" },
  ],
  certifications: [],
};
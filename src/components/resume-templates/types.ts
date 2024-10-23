// src/components/resume-templates/types.ts

// Tipos baseados no nosso schema Prisma
export interface ResumeTemplateData {
    personalInfo: {
      fullName: string;
      email: string;
      phone?: string;
      address?: string;
      linkedin?: string;
      website?: string;
    };
    professionalSummary: {
      summary: string;
    };
    workExperiences: {
      company: string;
      position: string;
      startDate: Date;
      endDate?: Date;
      description: string;
    }[];
    educations: {
      institution: string;
      degree: string;
      fieldOfStudy: string;
      startDate: Date;
      endDate?: Date;
    }[];
    skills: {
      name: string;
      level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';
    }[];
    projects: {
      name: string;
      description: string;
      url?: string;
    }[];
    languages: {
      name: string;
      level: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED' | 'FLUENT' | 'NATIVE';
    }[];
    certifications: {
      name: string;
      issuer: string;
      date: Date;
    }[];
  }
  
  // Interface base para todos os templates
  export interface ResumeTemplateProps {
    data: ResumeTemplateData;
    variant: 'preview' | 'full';
  }
  
  // Interface para configuração dos templates
  export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    isAvailableInFree: boolean;
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      accent: string;
    };
    fontSizes: {
      name: string;
      sectionTitle: string;
      subsectionTitle: string;
      normal: string;
    };
  }
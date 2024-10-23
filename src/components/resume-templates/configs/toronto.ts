// src/components/resume-templates/configs/toronto.ts
import { TemplateConfig } from '../types';

export const torontoConfig: TemplateConfig = {
  id: 'toronto',
  name: 'Toronto',
  description: 'Clean and professional template ideal for corporate positions',
  isAvailableInFree: true,
  colors: {
    primary: '#3B82F6',    // Usando as cores da nossa identidade visual
    secondary: '#1E40AF',
    text: '#4B5563',
    background: '#FFFFFF',
    accent: '#F3F4F6',
  },
  fontSizes: {
    name: '2.25rem',       // 36px
    sectionTitle: '1.5rem', // 24px
    subsectionTitle: '1.25rem', // 20px
    normal: '1rem',        // 16px
  },
};
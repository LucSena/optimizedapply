// src/components/resume-templates/toronto/pdf.tsx
import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  PDFViewer,
  Link
} from '@react-pdf/renderer';
import { ResumeTemplateProps } from '../types';
import { torontoConfig } from '../configs/toronto';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: torontoConfig.colors.primary,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 4,
    color: torontoConfig.colors.text,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: torontoConfig.colors.primary,
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  normalText: {
    fontSize: 10,
    marginBottom: 4,
    color: torontoConfig.colors.text,
  },
  dateText: {
    fontSize: 10,
    color: torontoConfig.colors.secondary,
    marginBottom: 4,
  },
  experienceItem: {
    marginBottom: 12,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
});

const TorontoPDFTemplate: React.FC<ResumeTemplateProps> = ({ data }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100%' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header / Personal Info */}
          <View style={styles.header}>
            <Text style={styles.name}>{data.personalInfo.fullName}</Text>
            <Text style={styles.contactInfo}>{data.personalInfo.email}</Text>
            {data.personalInfo.phone && (
              <Text style={styles.contactInfo}>{data.personalInfo.phone}</Text>
            )}
            {data.personalInfo.address && (
              <Text style={styles.contactInfo}>{data.personalInfo.address}</Text>
            )}
            {data.personalInfo.linkedin && (
              <Link src={data.personalInfo.linkedin}>
                <Text style={styles.contactInfo}>LinkedIn: {data.personalInfo.linkedin}</Text>
              </Link>
            )}
          </View>

          {/* Professional Summary */}
          {data.professionalSummary && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Professional Summary</Text>
              <Text style={styles.normalText}>{data.professionalSummary.summary}</Text>
            </View>
          )}

          {/* Work Experience */}
          {data.workExperiences.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              {data.workExperiences.map((experience, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subsectionTitle}>{experience.position}</Text>
                  <Text style={styles.normalText}>{experience.company}</Text>
                  <Text style={styles.dateText}>
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
                  </Text>
                  <Text style={styles.normalText}>{experience.description}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Education */}
          {data.educations.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.educations.map((education, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subsectionTitle}>
                    {education.degree} in {education.fieldOfStudy}
                  </Text>
                  <Text style={styles.normalText}>{education.institution}</Text>
                  <Text style={styles.dateText}>
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
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Skills */}
          {data.skills.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Skills</Text>
              <View style={styles.skillsContainer}>
                {data.skills.map((skill, index) => (
                  <Text key={index} style={styles.normalText}>
                    {skill.name} ({skill.level.toLowerCase()})
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Languages</Text>
              <View style={styles.skillsContainer}>
                {data.languages.map((language, index) => (
                  <Text key={index} style={styles.normalText}>
                    {language.name} - {language.level.toLowerCase()}
                  </Text>
                ))}
              </View>
            </View>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Certifications</Text>
              {data.certifications.map((cert, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subsectionTitle}>{cert.name}</Text>
                  <Text style={styles.normalText}>
                    {cert.issuer} - {new Date(cert.date).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </Text>
                </View>
              ))}
            </View>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Projects</Text>
              {data.projects.map((project, index) => (
                <View key={index} style={styles.experienceItem}>
                  <Text style={styles.subsectionTitle}>{project.name}</Text>
                  <Text style={styles.normalText}>{project.description}</Text>
                  {project.url && (
                    <Link src={project.url}>
                      <Text style={styles.normalText}>Project Link</Text>
                    </Link>
                  )}
                </View>
              ))}
            </View>
          )}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default TorontoPDFTemplate;
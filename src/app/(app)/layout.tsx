import { ResumeCreationProvider } from '@/contexts/ResumeCreationContext';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ResumeCreationProvider>
      {children}
    </ResumeCreationProvider>
  );
}
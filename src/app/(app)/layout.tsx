import { ResumeCreationProvider } from '@/contexts/ResumeCreationContext';
import { Toaster } from "@/components/ui/toaster";

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
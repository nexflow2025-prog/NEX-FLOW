"use client";

import { LegalDialog } from "@/components/legal/LegalDialog";
import { TermsContent } from "@/components/legal/TermsContent";

interface TermsDialogProps {
  trigger: React.ReactElement;
}

export function TermsDialog({ trigger }: TermsDialogProps) {
  return (
    <LegalDialog trigger={trigger}>
      <TermsContent />
    </LegalDialog>
  );
}

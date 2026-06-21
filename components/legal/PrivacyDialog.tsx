"use client";

import { LegalDialog } from "@/components/legal/LegalDialog";
import { PrivacyContent } from "@/components/legal/PrivacyContent";

interface PrivacyDialogProps {
  trigger: React.ReactElement;
}

export function PrivacyDialog({ trigger }: PrivacyDialogProps) {
  return (
    <LegalDialog trigger={trigger}>
      <PrivacyContent />
    </LegalDialog>
  );
}

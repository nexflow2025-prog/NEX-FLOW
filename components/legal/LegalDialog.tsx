"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface LegalDialogProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
}

export function LegalDialog({ trigger, children }: LegalDialogProps) {
  const [open, setOpen] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger} />
      <DialogContent
        showCloseButton
        className="fixed top-1/2 left-1/2 z-50 flex max-h-[95vh] !w-[95vw] !max-w-none -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-2xl bg-popover p-0 ring-1 ring-foreground/10 lg:!w-[85vw] xl:!w-[75vw]"
      >
        <div
          ref={scrollRef}
          className="overflow-y-auto px-6 py-10 sm:px-10 sm:py-12"
        >
          <div className="mx-auto max-w-3xl lg:max-w-5xl">{children}</div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

"use client";

import { Copy, Download } from "lucide-react";

import { Button } from "@/components/ui/button";
import { allInstallCommands } from "@/lib/skills";
import type { SkillCategory } from "@/types";

interface BulkActionsProps {
  categories: SkillCategory[];
  onCopy: (text: string, label: string) => void;
}

export function BulkActions({ categories, onCopy }: BulkActionsProps) {
  const commands = allInstallCommands(categories);
  const bashScript = `#!/usr/bin/env bash\nset -e\n\n${commands.join("\n")}\n`;
  const psScript = `${commands.join("\r\n")}\r\n`;

  function download(filename: string, content: string) {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-[#e62630]/30 bg-gradient-to-r from-[#e62630]/15 to-transparent p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h5 className="font-[family-name:var(--font-heading)] text-base font-bold text-foreground">
          ⬇ Instalar várias de uma vez
        </h5>
        <p className="mt-1 text-sm text-muted-foreground">
          Copie (ou baixe) um script com todos os comandos de instalação — rode
          no terminal.
        </p>
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          className="bg-[#e62630] text-white hover:bg-[#ff3a44]"
          onClick={() =>
            onCopy(
              commands.join("\n"),
              `Script com ${commands.length} instalações copiado!`
            )
          }
        >
          <Copy className="mr-1.5 size-4" />
          copiar tudo
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
          onClick={() => download("instalar-skills.sh", bashScript)}
        >
          <Download className="mr-1.5 size-4" />
          .sh
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="border-border text-foreground hover:border-[#e62630] hover:text-[#ff6b73]"
          onClick={() => download("instalar-skills.ps1", psScript)}
        >
          <Download className="mr-1.5 size-4" />
          .ps1
        </Button>
      </div>
    </div>
  );
}

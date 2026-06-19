"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchFilterProps {
  query: string;
  onQueryChange: (value: string) => void;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}

export function SearchFilter({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Buscar... (ex: segurança, mcp, pdf, testes, design)"
          className="h-12 rounded-xl border-border bg-[#101013] pl-11 text-foreground placeholder:text-muted-foreground focus:border-[#e62630] focus:ring-[#e62630]/20"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onCategoryChange("all")}
          className={cn(
            "rounded-full border-border font-[family-name:var(--font-mono)] text-xs",
            activeCategory === "all"
              ? "border-[#e62630] bg-[#e62630] text-white hover:bg-[#ff3a44]"
              : "text-muted-foreground hover:border-muted-foreground hover:text-foreground"
          )}
        >
          Todas
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant="outline"
            size="sm"
            onClick={() => onCategoryChange(category)}
            className={cn(
              "rounded-full border-border font-[family-name:var(--font-mono)] text-xs",
              activeCategory === category
                ? "border-[#e62630] bg-[#e62630] text-white hover:bg-[#ff3a44]"
                : "text-muted-foreground hover:border-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

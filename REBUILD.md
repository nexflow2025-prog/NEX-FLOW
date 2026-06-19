# NexSkills — Rebuild Next.js

Projeto recriado em Next.js (App Router) + TypeScript + Tailwind CSS + ShadCN UI, usando os arquivos HTML/CSS/JS legados apenas como referência visual e funcional.

## Mapeamento de páginas

| Arquivo legado      | Rota nova         | Função                                          |
| ------------------- | ----------------- | ----------------------------------------------- |
| `index.html`        | `/`               | Landing page de vendas                          |
| `app.html`          | `/explore`        | Catálogo público/amostra (24 skills)            |
| `completo.html`     | `/dashboard`      | Catálogo completo para membros (114 skills)     |
| `membros.html`      | `/members`        | Área de membros com acesso ao dashboard/guia    |
| `guia.html`         | `/guide`          | Guia passo a passo                              |

## Estrutura de pastas

```
my-app/
├── app/                    # Rotas do App Router
│   ├── page.tsx            # Landing page
│   ├── layout.tsx          # Layout raiz (fontes, tema escuro)
│   ├── globals.css         # Variáveis e estilos globais
│   ├── explore/page.tsx    # Catálogo amostra
│   ├── dashboard/page.tsx  # Catálogo completo
│   ├── members/page.tsx    # Área de membros
│   └── guide/page.tsx      # Guia
├── components/
│   ├── ui/                 # Componentes ShadCN
│   ├── layout/             # Header, Footer
│   ├── catalog/            # SkillCard, CategoryTrack, ClientCatalog etc.
│   └── marketing/          # Seções da landing page
├── data/
│   ├── categories.ts       # Categorias tipadas (sample + full)
│   ├── site.ts             # Configurações do site
│   ├── skills-full.json    # 114 skills extraídas
│   └── skills-sample.json  # 24 skills extraídas
├── lib/
│   ├── utils.ts            # cn helper
│   └── skills.ts           # Helpers de busca, cópia, comandos
└── types/
    └── index.ts            # Interfaces Skill, SkillCategory etc.
```

## Componentes criados

### Layout
- `Header` — navegação sticky com menu mobile
- `Footer` — rodapé simples

### Catálogo
- `ClientCatalog` — gerencia busca, filtros, cópia e toasts
- `SkillCard` — card individual de skill com ações instalar/usar/repo
- `CategoryTrack` — agrupa cards por categoria com "ver todas"
- `SearchFilter` — busca + filtros de categoria
- `BulkActions` — copiar/baixar todos os comandos (.sh / .ps1)
- `HowToPanel` — painel "Como usar" em 2 passos
- `StatsBadges` — badges de totais

### Marketing
- `Hero`, `ProblemSection`, `FeaturesSection`, `CategoriesProof`
- `OfferSection`, `FaqSection`, `FinalCta`

## Funcionalidades implementadas

- Navegação moderna com App Router
- Layout reutilizável com Header/Footer
- Tema escuro mantendo a identidade visual vermelha original
- Busca textual por nome/descrição/tipo
- Filtro por categoria
- Copiar comando de instalação e de uso
- Download em lote dos scripts `.sh` e `.ps1`
- Toasts de confirmação
- Responsividade total
- Páginas `/dashboard` e `/members` com `noindex`

## Melhorias de UX/UI aplicadas

- Tipografia refinada (Archivo/Manrope/JetBrains Mono via Next Font)
- Espaçamentos mais consistentes e respirados
- Cards com hover e glow sutis
- Accordion moderno para FAQ
- Header sticky com blur
- Estado visual claro para filtros ativos
- Código tipado com TypeScript

## Como rodar

```bash
cd my-app
npm install
npm run dev
```

## Build

```bash
npm run build
```

O build já foi testado com sucesso e gera páginas estáticas para todas as rotas.

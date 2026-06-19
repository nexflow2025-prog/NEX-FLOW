# SPEC — NEXSKILLS (Arquitetura Técnica)

## 1. Stack

### Frontend

* React (Next.js recomendado)
* Tailwind CSS
* shadcn/ui
* Lucide Icons

### Ferramentas

* 21st.dev (Magic MCP)
* Radix UI (via shadcn)

---

## 2. Estrutura do Projeto

/app
/login
/dashboard

/components
/ui (shadcn)
Header
Sidebar
SkillCard
CategorySection
SearchBar

/lib
data.ts

/styles
globals.css

---

## 3. Componentes

### 3.1 SkillCard

Props:

* title
* description
* command
* category

Funções:

* copiar comando
* botão instalar

---

### 3.2 CategorySection

Props:

* title
* skills[]

Renderiza:

* lista de SkillCard

---

### 3.3 SearchBar

Funções:

* filtrar lista
* input controlado

---

### 3.4 Header

Contém:

* título
* estatísticas
* descrição

---

## 4. Estado

State global:

* skills (data.ts)
* filtro ativo
* termo de busca

---

## 5. Dados

Migrar de:

* data.js

Para:

* data.ts

Formato:

{
id: string
name: string
description: string
command: string
category: string
}

---

## 6. Estilização

### Tailwind

* substituir CSS custom

### Tokens

bg: #0a0a0c
primary: #e62630
text: #ffffff
muted: #b9b3bd

---

## 7. Layout

Grid:

* responsive
* auto-fit cards

---

## 8. Login

Simples:

* mock auth (localStorage)
* redirecionamento

---

## 9. Interações

* copiar comando → clipboard API
* hover effects
* loading states

---

## 10. Integrações MCP

### 21st.dev

* gerar componentes

### shadcn

* base UI

### lucide

* ícones

---

## 11. Performance

* lazy load componentes
* evitar re-render desnecessário

---

## 12. Responsividade

* mobile-first
* breakpoints Tailwind

---

## 13. Deploy

* Vercel (Next.js)
* ou Netlify

---

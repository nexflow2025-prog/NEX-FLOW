import "dotenv/config";

import { createClient } from "@supabase/supabase-js";
import { slugify } from "../lib/skills";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

async function seed() {
  const full = await import("../data/skills-full.json");
  const sample = await import("../data/skills-sample.json");

  const fullCategories = full.default as {
    category: string;
    color: string;
    items: {
      n: number;
      rank: number;
      name: string;
      desc: string;
      url: string;
      kind: string;
      install?: string;
      use?: string;
    }[];
  }[];

  const sampleCategories = sample.default as typeof fullCategories;

  const sampleNumbers = new Set(
    sampleCategories.flatMap((cat) => cat.items.map((item) => item.n))
  );

  // Tipos
  const tipos = [
    { codigo: "skill", rotulo: "skill", ordem: 1 },
    { codigo: "plugin", rotulo: "plugin", ordem: 2 },
    { codigo: "mcp", rotulo: "MCP", ordem: 3 },
    { codigo: "agent", rotulo: "agente", ordem: 4 },
    { codigo: "tool", rotulo: "ferramenta", ordem: 5 },
  ];

  console.log("Limpando tabelas...");
  await supabase.from("skills").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("categorias").delete().neq("id", "00000000-0000-0000-0000-000000000000");
  await supabase.from("tipos_skill").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  console.log("Inserindo tipos...");
  const { data: tiposInseridos, error: tiposError } = await supabase
    .from("tipos_skill")
    .insert(tipos)
    .select();

  if (tiposError) throw tiposError;

  const tipoMap = new Map(tiposInseridos!.map((t) => [t.codigo, t.id]));

  console.log("Inserindo categorias...");
  const categoriasData = fullCategories.map((cat, index) => ({
    nome: cat.category,
    slug: slugify(cat.category),
    cor: cat.color,
    ordem: index + 1,
  }));

  const { data: categoriasInseridas, error: categoriasError } = await supabase
    .from("categorias")
    .insert(categoriasData)
    .select();

  if (categoriasError) throw categoriasError;

  const categoriaMap = new Map(
    categoriasInseridas!.map((c) => [c.nome, c.id])
  );

  console.log("Inserindo skills...");
  const slugCount = new Map<string, number>();
  const getUniqueSlug = (name: string) => {
    const base = slugify(name);
    const count = slugCount.get(base) ?? 0;
    slugCount.set(base, count + 1);
    return count === 0 ? base : `${base}-${count}`;
  };

  const skillsData = fullCategories.flatMap((cat) =>
    cat.items.map((item) => ({
      numero: item.n,
      rank: item.rank,
      nome: item.name,
      slug: getUniqueSlug(item.name),
      descricao: item.desc,
      url_repositorio: item.url,
      comando_instalacao: item.install || null,
      comando_uso: item.use || null,
      mostrar_no_preview: sampleNumbers.has(item.n),
      ativo: true,
      categoria_id: categoriaMap.get(cat.category)!,
      tipo_id: tipoMap.get(item.kind)!,
    }))
  );

  const { error: skillsError } = await supabase.from("skills").insert(skillsData);

  if (skillsError) throw skillsError;

  console.log(
    `Seed concluído: ${categoriasInseridas!.length} categorias, ${tiposInseridos!.length} tipos, ${skillsData.length} skills.`
  );
}

seed().catch((err) => {
  console.error("Erro no seed:", err);
  process.exit(1);
});

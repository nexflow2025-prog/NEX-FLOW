import { redirect } from "next/navigation";

// /explorer foi renomeado para /catalogo.
// Este redirect garante compatibilidade com links antigos.
export default function ExplorerRedirectPage() {
  redirect("/catalogo");
}

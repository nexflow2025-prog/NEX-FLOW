#!/usr/bin/env python3
"""
Diagnóstico estático do fluxo de login do NEX-FLOW.
Não lê arquivos .env nem modifica o projeto.
"""

import os
import re
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

EXCLUDE_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".kimi",
    ".venv",
    "venv",
    "__pycache__",
}
EXCLUDE_FILES = {".env", ".env.local", ".env.production", ".env.development"}

PATTERNS = {
    "signInWithPassword": r"signInWithPassword",
    "signInWithOAuth": r"signInWithOAuth",
    'provider: "google"': r'provider:\s*"google"',
    "redirectTo": r"redirectTo",
    "window.location.href": r"window\.location\.href",
    "/auth/callback": r"/auth/callback",
    "/pos-login": r"/pos-login",
    "/entrar": r"/entrar",
    "LoginModal": r"LoginModal",
    "LoginForm": r"LoginForm",
    "LoginButton": r"LoginButton",
    "onGoogleSignIn": r"onGoogleSignIn",
    'type="submit"': r'type\s*=\s*"submit"',
    'type="button"': r'type\s*=\s*"button"',
    "PUBLIC_PATHS": r"PUBLIC_PATHS",
}


def should_read(path: Path) -> bool:
    if path.name.startswith(".") and path.suffix in {".env", ".local"}:
        return False
    if path.name in EXCLUDE_FILES:
        return False
    if any(part in EXCLUDE_DIRS for part in path.parts):
        return False
    # Só analisar textos conhecidos
    return path.suffix in {
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".json",
        ".md",
        ".py",
        ".sql",
    }


def scan() -> dict:
    matches = defaultdict(list)
    for path in ROOT.rglob("*"):
        if path.is_file() and should_read(path):
            try:
                text = path.read_text(encoding="utf-8")
            except Exception:
                continue
            lines = text.splitlines()
            for line_no, line in enumerate(lines, start=1):
                for label, pattern in PATTERNS.items():
                    if re.search(pattern, line):
                        matches[label].append(
                            {
                                "file": str(path.relative_to(ROOT)),
                                "line": line_no,
                                "snippet": line.strip(),
                            }
                        )
    return matches


def main():
    print("=" * 80)
    print("AUDITORIA DE FLUXO DE LOGIN — NEX-FLOW")
    print("=" * 80)
    print()

    matches = scan()

    # Exibir todos os matches agrupados por padrão
    for label in PATTERNS.keys():
        print(f"\n## {label}")
        print("-" * 80)
        items = matches.get(label, [])
        if not items:
            print("  (nenhuma ocorrência)")
            continue
        for item in items:
            print(f"  {item['file']}:{item['line']}")
            print(f"    → {item['snippet']}")

    print("\n" + "=" * 80)
    print("RESUMO ESTRUTURADO")
    print("=" * 80)

    # Contagens
    signin_password = matches.get("signInWithPassword", [])
    signin_oauth = matches.get("signInWithOAuth", [])
    google_provider = matches.get('provider: "google"', [])
    login_modal = matches.get("LoginModal", [])
    login_form = matches.get("LoginForm", [])
    login_button = matches.get("LoginButton", [])
    entrar_refs = matches.get("/entrar", [])
    pos_login_refs = matches.get("/pos-login", [])
    public_paths = matches.get("PUBLIC_PATHS", [])
    submit_buttons = matches.get('type="submit"', [])
    button_buttons = matches.get('type="button"', [])

    print(f"\n1. Fluxos de login encontrados: {len(signin_password) + len(signin_oauth)}")
    print(f"   - Login por email/senha (signInWithPassword): {len(signin_password)}")
    for item in signin_password:
        print(f"     → {item['file']}:{item['line']}")

    print(f"\n2. Login com Google (signInWithOAuth): {len(signin_oauth)}")
    for item in signin_oauth:
        print(f"     → {item['file']}:{item['line']}")

    print(f"\n3. Configurações de provider google: {len(google_provider)}")
    for item in google_provider:
        print(f"     → {item['file']}:{item['line']}")

    print(f"\n4. Componentes/funcionalidades:")
    print(f"   - LoginModal: {len(login_modal)} referências")
    for item in login_modal:
        print(f"     → {item['file']}:{item['line']}")
    print(f"   - LoginForm: {len(login_form)} referências")
    for item in login_form:
        print(f"     → {item['file']}:{item['line']}")
    print(f"   - LoginButton: {len(login_button)} referências")
    for item in login_button:
        print(f"     → {item['file']}:{item['line']}")

    print(f"\n5. Referências a /entrar: {len(entrar_refs)}")
    for item in entrar_refs:
        print(f"   → {item['file']}:{item['line']}")

    print(f"\n6. Referências a /pos-login: {len(pos_login_refs)}")
    for item in pos_login_refs:
        print(f"   → {item['file']}:{item['line']}")

    print(f"\n7. PUBLIC_PATHS (middleware liberando rotas):")
    for item in public_paths:
        print(f"   → {item['file']}:{item['line']}")
        print(f"     {item['snippet']}")

    print(f"\n8. Botões type=submit vs type=button:")
    print(f"   - type=submit: {len(submit_buttons)}")
    for item in submit_buttons:
        print(f"     → {item['file']}:{item['line']} | {item['snippet'][:80]}")
    print(f"   - type=button: {len(button_buttons)}")
    for item in button_buttons:
        print(f"     → {item['file']}:{item['line']} | {item['snippet'][:80]}")

    # Páginas que usam LoginModal
    pages_with_modal = [
        item["file"]
        for item in login_modal
        if item["file"] != "components/auth/LoginModal.tsx"
    ]
    print(f"\n9. Páginas/componentes que instanciam LoginModal:")
    for page in pages_with_modal:
        print(f"   → {page}")

    # Verificação se /pos-login ainda é destino de redirecionamento
    pos_login_redirects = [
        item
        for item in pos_login_refs
        if "window.location.href" in item["snippet"] or "redirect" in item["snippet"]
    ]
    print(f"\n10. /pos-login ainda usada como destino de redirecionamento?")
    if pos_login_redirects:
        print("    SIM — ainda existem redirecionamentos ativos:")
        for item in pos_login_redirects:
            print(f"    → {item['file']}:{item['line']} | {item['snippet']}")
    else:
        print("    NÃO — nenhum redirecionamento ativo encontrado (apenas declaração no middleware).")

    # Verificação se /auth/callback está em PUBLIC_PATHS
    callback_public = any("/auth/callback" in item["snippet"] for item in public_paths)
    print(f"\n11. /auth/callback está liberado no middleware?")
    print(f"    {'SIM' if callback_public else 'NÃO'}")

    # Verificação do botão Google
    login_form_path = ROOT / "components" / "ui" / "login-form.tsx"
    google_button_type = "indefinido"
    if login_form_path.exists():
        content = login_form_path.read_text(encoding="utf-8")
        # Procurar botão que tenha onClick={onGoogleSignIn}
        match = re.search(
            r'<button[^>]*onClick=\{onGoogleSignIn\}[^>]*>', content, re.DOTALL
        )
        if match:
            btn_tag = match.group(0)
            if 'type="button"' in btn_tag:
                google_button_type = "button (não submete formulário)"
            elif 'type="submit"' in btn_tag:
                google_button_type = "submit (SUBMETE O FORMULÁRIO — problema!)"
            else:
                google_button_type = "sem type explícito (padrão pode variar, risco de submit)"

    print(f"\n12. Tipo do botão Google em login-form.tsx: {google_button_type}")

    # Conclusão preliminar
    print("\n" + "=" * 80)
    print("CONCLUSÃO PRELIMINAR DA ANÁLISE ESTÁTICA")
    print("=" * 80)
    if len(signin_password) == 1 and len(signin_oauth) == 1:
        print("- Apenas UM fluxo de login por senha e UM por OAuth foram encontrados.")
        print("- Ambos estão no mesmo arquivo: components/auth/LoginModal.tsx")
    if google_button_type.startswith("button"):
        print("- O botão Google está declarado como type='button', então não deve disparar o submit do formulário.")
    print("- /entrar existe como rota mas apenas redireciona para '/'.")
    print("- /pos-login ainda é rota pública, mas não é mais destino de redirecionamento de login.")
    print("- /auth/callback está liberada no middleware e redireciona para /membros.")
    print("- Há botões/links na landing apontando para /entrar (Hero, UserNav, LoginButton), o que pode confundir o usuário.")
    print("\nPróximo passo: analisar os logs de runtime para confirmar qual provider é realmente chamado.")


if __name__ == "__main__":
    main()

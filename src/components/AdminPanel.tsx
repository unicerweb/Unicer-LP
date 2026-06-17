"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { LogOut, Loader2 } from "lucide-react";
import type { Catalog } from "@/types/catalog";
import { CategoryManager } from "@/components/admin/CategoryManager";
import { ItemManager } from "@/components/admin/ItemManager";

type Tab = "categories" | "items";

export function AdminPanel() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [catalog, setCatalog] = useState<Catalog>({ categories: [], items: [] });
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("categories");

  const loadSession = useCallback(async () => {
    const res = await fetch("/api/auth/session");
    const data = (await res.json()) as { authenticated: boolean };
    setAuthenticated(data.authenticated);
    return data.authenticated;
  }, []);

  const loadCatalog = useCallback(async () => {
    const res = await fetch("/api/catalog");
    const data = (await res.json()) as Catalog;
    setCatalog(data);
  }, []);

  useEffect(() => {
    async function init() {
      setLoading(true);
      const isAuth = await loadSession();
      if (isAuth) await loadCatalog();
      setLoading(false);
    }
    init();
  }, [loadSession, loadCatalog]);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (!res.ok) {
      setLoginError("Senha incorreta. Tente novamente.");
      return;
    }

    setAuthenticated(true);
    setPassword("");
    await loadCatalog();
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setAuthenticated(false);
    setCatalog({ categories: [], items: [] });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <Loader2 className="h-8 w-8 animate-spin text-unicer-blue" />
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-md rounded-2xl border border-unicer-blue/10 bg-white p-8 shadow-xl shadow-unicer-blue/5">
          <div className="mb-8 flex flex-col items-center text-center">
            <Image src="/logo.png" alt="Unicer" width={180} height={60} className="h-12 w-auto" />
            <h1 className="mt-6 text-2xl font-bold text-unicer-blue">Painel Admin</h1>
            <p className="mt-2 text-sm text-unicer-blue/65">
              Gerencie categorias e itens do catálogo
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-unicer-blue">
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50 focus:ring-1 focus:ring-unicer-red/20"
                placeholder="Digite a senha de acesso"
              />
            </div>
            {loginError && <p className="text-sm text-unicer-red">{loginError}</p>}
            <button
              type="submit"
              className="w-full rounded-xl bg-unicer-red-dark py-3 font-semibold text-white transition-colors hover:bg-unicer-red-darker"
            >
              Entrar
            </button>
          </form>

          <Link href="/" className="mt-6 block text-center text-sm text-unicer-blue/60 hover:text-unicer-red">
            ← Voltar ao site
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b border-unicer-blue/10 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" alt="Unicer" width={140} height={47} className="h-9 w-auto" />
            <span className="hidden text-sm font-medium text-unicer-blue/60 sm:block">
              Catálogo
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-unicer-blue/65 hover:text-unicer-red">
              Ver site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 rounded-lg border border-unicer-blue/15 px-3 py-2 text-sm text-unicer-blue transition-colors hover:bg-unicer-blue/5"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-8 flex gap-2 rounded-xl border border-unicer-blue/10 bg-white p-1">
          <button
            type="button"
            onClick={() => setTab("categories")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === "categories"
                ? "bg-unicer-blue text-white"
                : "text-unicer-blue/65 hover:bg-unicer-blue/5"
            }`}
          >
            Categorias ({catalog.categories.length})
          </button>
          <button
            type="button"
            onClick={() => setTab("items")}
            className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              tab === "items"
                ? "bg-unicer-blue text-white"
                : "text-unicer-blue/65 hover:bg-unicer-blue/5"
            }`}
          >
            Itens ({catalog.items.length})
          </button>
        </div>

        {tab === "categories" ? (
          <CategoryManager catalog={catalog} onChange={setCatalog} />
        ) : (
          <ItemManager catalog={catalog} onChange={setCatalog} />
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  X,
  Check,
  Eye,
  EyeOff,
  Loader2,
  FolderOpen,
} from "lucide-react";
import type { Catalog, Category, CategoryInput } from "@/types/catalog";

const EMPTY_CATEGORY: CategoryInput = {
  slug: "",
  label: "",
  title: "",
  description: "",
  layout: "grid",
  highlightTitle: "",
  highlightDescription: "",
};

interface CategoryManagerProps {
  catalog: Catalog;
  onChange: (catalog: Catalog) => void;
}

export function CategoryManager({ catalog, onChange }: CategoryManagerProps) {
  const [form, setForm] = useState<CategoryInput>(EMPTY_CATEGORY);
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<CategoryInput>(EMPTY_CATEGORY);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const sorted = [...catalog.categories].sort((a, b) => a.order - b.order);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Erro ao criar categoria");
      return;
    }

    const category = (await res.json()) as Category;
    onChange({ ...catalog, categories: [...catalog.categories, category] });
    setForm(EMPTY_CATEGORY);
  };

  const startEdit = (category: Category) => {
    setEditId(category.id);
    setEditError("");
    setEditForm({
      slug: category.slug,
      label: category.label,
      title: category.title,
      description: category.description,
      layout: category.layout,
      highlightTitle: category.highlightTitle || "",
      highlightDescription: category.highlightDescription || "",
    });
  };

  const handleSaveEdit = async (e: FormEvent, id: string) => {
    e.preventDefault();
    setEditError("");
    setSavingEdit(true);

    const res = await fetch(`/api/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editForm),
    });

    setSavingEdit(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setEditError(data.error || "Erro ao salvar");
      return;
    }

    const updated = (await res.json()) as Category;
    onChange({
      ...catalog,
      categories: catalog.categories.map((c) => (c.id === id ? updated : c)),
    });
    setEditId(null);
  };

  const handleToggle = async (category: Category) => {
    setBusyId(category.id);
    const res = await fetch(`/api/categories/${category.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !category.active }),
    });
    setBusyId(null);

    if (res.ok) {
      const updated = (await res.json()) as Category;
      onChange({
        ...catalog,
        categories: catalog.categories.map((c) => (c.id === category.id ? updated : c)),
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta categoria?")) return;

    setBusyId(id);
    const res = await fetch(`/api/categories/${id}`, { method: "DELETE" });
    setBusyId(null);

    if (res.ok) {
      onChange({
        ...catalog,
        categories: catalog.categories.filter((c) => c.id !== id),
      });
      if (editId === id) setEditId(null);
    } else {
      const data = (await res.json()) as { error?: string };
      alert(data.error || "Erro ao excluir");
    }
  };

  const CategoryFields = ({
    value,
    onUpdate,
    idPrefix,
  }: {
    value: CategoryInput;
    onUpdate: (v: CategoryInput) => void;
    idPrefix: string;
  }) => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-label`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
          Nome da categoria *
        </label>
        <input
          id={`${idPrefix}-label`}
          value={value.label}
          onChange={(e) => onUpdate({ ...value, label: e.target.value })}
          required
          className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
          placeholder="Ex: Peças"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-slug`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
          Identificador (URL)
        </label>
        <input
          id={`${idPrefix}-slug`}
          value={value.slug}
          onChange={(e) => onUpdate({ ...value, slug: e.target.value })}
          className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
          placeholder="Ex: pecas"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-title`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
          Título da seção *
        </label>
        <input
          id={`${idPrefix}-title`}
          value={value.title}
          onChange={(e) => onUpdate({ ...value, title: e.target.value })}
          required
          className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-description`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
          Descrição *
        </label>
        <textarea
          id={`${idPrefix}-description`}
          value={value.description}
          onChange={(e) => onUpdate({ ...value, description: e.target.value })}
          required
          rows={2}
          className="w-full resize-none rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-layout`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
          Layout dos itens
        </label>
        <select
          id={`${idPrefix}-layout`}
          value={value.layout}
          onChange={(e) =>
            onUpdate({ ...value, layout: e.target.value as "grid" | "list" })
          }
          className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none"
        >
          <option value="grid">Grade (cards)</option>
          <option value="list">Lista numerada</option>
        </select>
      </div>
      {value.layout === "list" && (
        <>
          <div>
            <label htmlFor={`${idPrefix}-highlight`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
              Destaque lateral (título)
            </label>
            <input
              id={`${idPrefix}-highlight`}
              value={value.highlightTitle || ""}
              onChange={(e) => onUpdate({ ...value, highlightTitle: e.target.value })}
              className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-highlight-desc`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
              Destaque lateral (descrição)
            </label>
            <textarea
              id={`${idPrefix}-highlight-desc`}
              value={value.highlightDescription || ""}
              onChange={(e) =>
                onUpdate({ ...value, highlightDescription: e.target.value })
              }
              rows={2}
              className="w-full resize-none rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none"
            />
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-unicer-blue/10 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-unicer-blue">
          <Plus className="h-5 w-5 text-unicer-red" />
          Nova categoria
        </h2>
        <form onSubmit={handleAdd} className="mt-6 space-y-4">
          <CategoryFields value={form} onUpdate={setForm} idPrefix="new" />
          {error && <p className="text-sm text-unicer-red">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-unicer-red-dark px-6 py-3 font-semibold text-white hover:bg-unicer-red-darker disabled:opacity-70"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Criar categoria
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-unicer-blue/10 bg-white shadow-sm">
        <div className="border-b border-unicer-blue/10 px-6 py-4">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-unicer-blue">
            <FolderOpen className="h-5 w-5 text-unicer-red" />
            Categorias ({sorted.length})
          </h2>
        </div>
        <ul className="divide-y divide-unicer-blue/10">
          {sorted.map((category) => {
            const itemCount = catalog.items.filter((i) => i.categoryId === category.id).length;
            return (
              <li key={category.id} className={`px-6 py-4 ${!category.active ? "bg-unicer-blue/[0.02]" : ""}`}>
                {editId === category.id ? (
                  <form onSubmit={(e) => handleSaveEdit(e, category.id)} className="space-y-4">
                    <CategoryFields value={editForm} onUpdate={setEditForm} idPrefix={`edit-${category.id}`} />
                    {editError && <p className="text-sm text-unicer-red">{editError}</p>}
                    <div className="flex gap-2">
                      <button type="submit" disabled={savingEdit} className="inline-flex items-center gap-2 rounded-xl bg-unicer-red-dark px-5 py-2.5 text-sm font-semibold text-white">
                        {savingEdit ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                        Salvar
                      </button>
                      <button type="button" onClick={() => setEditId(null)} className="rounded-xl border border-unicer-blue/15 px-5 py-2.5 text-sm text-unicer-blue">
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className={`font-semibold ${category.active ? "text-unicer-blue" : "text-unicer-blue/50"}`}>
                          {category.label}
                        </h3>
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${category.active ? "bg-green-100 text-green-700" : "bg-unicer-blue/10 text-unicer-blue/50"}`}>
                          {category.active ? "Ativa" : "Inativa"}
                        </span>
                        <span className="rounded-full bg-unicer-blue/5 px-2.5 py-0.5 text-xs text-unicer-blue/70">
                          {category.layout === "grid" ? "Grade" : "Lista"}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-unicer-blue/65">{category.title}</p>
                      <p className="mt-1 text-xs text-unicer-blue/45">
                        #{category.slug} · {itemCount} item{itemCount !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-1">
                      <button type="button" onClick={() => handleToggle(category)} disabled={busyId === category.id} className="rounded-lg p-2 text-unicer-blue/60 hover:bg-unicer-blue/5 disabled:opacity-50">
                        {busyId === category.id ? <Loader2 className="h-5 w-5 animate-spin" /> : category.active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                      </button>
                      <button type="button" onClick={() => startEdit(category)} className="rounded-lg p-2 text-unicer-blue hover:bg-unicer-blue/5">
                        <Pencil className="h-5 w-5" />
                      </button>
                      <button type="button" onClick={() => handleDelete(category.id)} disabled={busyId === category.id} className="rounded-lg p-2 text-unicer-red hover:bg-unicer-red/10 disabled:opacity-50">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

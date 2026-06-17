"use client";

import { useMemo, useState, type FormEvent } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  Check,
  Eye,
  EyeOff,
  Loader2,
  Package,
} from "lucide-react";
import { ICON_LABELS } from "@/lib/catalog-labels";
import { ItemImageUploader } from "@/components/admin/ItemImageUploader";
import {
  ITEM_ICONS,
  isPecasCategory,
  type Catalog,
  type CatalogItem,
  type ItemIcon,
  type ItemInput,
} from "@/types/catalog";
import { getPecasImageFolder } from "@/lib/pecas-image-folders";

const EMPTY_ITEM: ItemInput = {
  categoryId: "",
  title: "",
  summary: "",
  description: "",
  icon: "gear",
};

interface ItemManagerProps {
  catalog: Catalog;
  onChange: (catalog: Catalog) => void;
}

export function ItemManager({ catalog, onChange }: ItemManagerProps) {
  const [filterCategoryId, setFilterCategoryId] = useState("all");
  const [form, setForm] = useState<ItemInput>({
    ...EMPTY_ITEM,
    categoryId: catalog.categories[0]?.id || "",
  });
  const [editId, setEditId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ItemInput>(EMPTY_ITEM);
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const sortedCategories = useMemo(
    () => [...catalog.categories].sort((a, b) => a.order - b.order),
    [catalog.categories]
  );

  const filteredItems = useMemo(() => {
    const items = [...catalog.items].sort((a, b) => a.order - b.order);
    if (filterCategoryId === "all") return items;
    return items.filter((i) => i.categoryId === filterCategoryId);
  }, [catalog.items, filterCategoryId]);

  const getCategory = (id: string) => catalog.categories.find((c) => c.id === id);

  const updateItemInCatalog = (updated: CatalogItem) => {
    onChange({
      ...catalog,
      items: catalog.items.map((i) => (i.id === updated.id ? updated : i)),
    });
  };

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const category = getCategory(form.categoryId);
    const payload: ItemInput = isPecasCategory(category ?? { slug: "" })
      ? form
      : { ...form, summary: form.description.trim(), description: form.description.trim() };

    const res = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSubmitting(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Erro ao criar item");
      return;
    }

    const item = (await res.json()) as CatalogItem;
    onChange({ ...catalog, items: [...catalog.items, item] });
    setForm({ ...EMPTY_ITEM, categoryId: form.categoryId });
  };

  const startEdit = (item: CatalogItem) => {
    setEditId(item.id);
    setEditError("");
    setEditForm({
      categoryId: item.categoryId,
      title: item.title,
      summary: item.summary,
      description: item.description,
      icon: item.icon || "gear",
    });
  };

  const handleSaveEdit = async (e: FormEvent, id: string) => {
    e.preventDefault();
    setEditError("");
    setSavingEdit(true);

    const category = getCategory(editForm.categoryId);
    const payload: ItemInput = isPecasCategory(category ?? { slug: "" })
      ? editForm
      : {
          ...editForm,
          summary: editForm.description.trim(),
          description: editForm.description.trim(),
        };

    const res = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setSavingEdit(false);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setEditError(data.error || "Erro ao salvar");
      return;
    }

    const updated = (await res.json()) as CatalogItem;
    updateItemInCatalog(updated);
    setEditId(null);
  };

  const handleToggle = async (item: CatalogItem) => {
    setBusyId(item.id);
    const res = await fetch(`/api/items/${item.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !item.active }),
    });
    setBusyId(null);

    if (res.ok) {
      const updated = (await res.json()) as CatalogItem;
      updateItemInCatalog(updated);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este item?")) return;

    setBusyId(id);
    const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
    setBusyId(null);

    if (res.ok) {
      onChange({ ...catalog, items: catalog.items.filter((i) => i.id !== id) });
      if (editId === id) setEditId(null);
    }
  };

  const ItemFields = ({
    value,
    onUpdate,
    idPrefix,
  }: {
    value: ItemInput;
    onUpdate: (v: ItemInput) => void;
    idPrefix: string;
  }) => {
    const category = getCategory(value.categoryId);
    const isPecas = category ? isPecasCategory(category) : false;
    const showIcon = category?.layout === "grid";

    return (
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-category`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
            Categoria *
          </label>
          <select
            id={`${idPrefix}-category`}
            value={value.categoryId}
            onChange={(e) => onUpdate({ ...value, categoryId: e.target.value })}
            required
            className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none"
          >
            {sortedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${idPrefix}-title`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
            Título *
          </label>
          <input
            id={`${idPrefix}-title`}
            value={value.title}
            onChange={(e) => onUpdate({ ...value, title: e.target.value })}
            required
            className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
          />
        </div>
        {isPecas ? (
          <>
            <div className="sm:col-span-2">
              <label htmlFor={`${idPrefix}-summary`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
                Resumo (card) *
              </label>
              <textarea
                id={`${idPrefix}-summary`}
                value={value.summary}
                onChange={(e) => onUpdate({ ...value, summary: e.target.value })}
                required
                rows={2}
                placeholder="Texto curto exibido no card do catálogo"
                className="w-full resize-none rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor={`${idPrefix}-description`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
                Descrição completa *
              </label>
              <textarea
                id={`${idPrefix}-description`}
                value={value.description}
                onChange={(e) => onUpdate({ ...value, description: e.target.value })}
                required
                rows={6}
                placeholder="Detalhes técnicos, aplicações, especificações..."
                className="w-full resize-y rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
              />
            </div>
          </>
        ) : (
          <div className="sm:col-span-2">
            <label htmlFor={`${idPrefix}-description`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
              Descrição *
            </label>
            <textarea
              id={`${idPrefix}-description`}
              value={value.description}
              onChange={(e) => onUpdate({ ...value, description: e.target.value })}
              required
              rows={3}
              className="w-full resize-none rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none focus:border-unicer-red/50"
            />
          </div>
        )}
        {showIcon && (
          <div>
            <label htmlFor={`${idPrefix}-icon`} className="mb-1.5 block text-sm font-medium text-unicer-blue">
              Ícone
            </label>
            <select
              id={`${idPrefix}-icon`}
              value={value.icon}
              onChange={(e) =>
                onUpdate({ ...value, icon: e.target.value as ItemIcon })
              }
              className="w-full rounded-xl border border-unicer-blue/15 bg-muted px-4 py-3 text-unicer-blue outline-none"
            >
              {ITEM_ICONS.map((icon) => (
                <option key={icon} value={icon}>
                  {ICON_LABELS[icon]}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    );
  };

  if (sortedCategories.length === 0) {
    return (
      <div className="rounded-2xl border border-unicer-blue/10 bg-white p-8 text-center text-unicer-blue/60">
        Crie uma categoria antes de adicionar itens.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-unicer-blue/10 bg-white p-6 shadow-sm">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-unicer-blue">
          <Plus className="h-5 w-5 text-unicer-red" />
          Novo item
        </h2>
        <form onSubmit={handleAdd} className="mt-6 space-y-4">
          <ItemFields value={form} onUpdate={setForm} idPrefix="new-item" />
          {error && <p className="text-sm text-unicer-red">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-xl bg-unicer-red-dark px-6 py-3 font-semibold text-white hover:bg-unicer-red-darker disabled:opacity-70"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            Criar item
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-unicer-blue/10 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-unicer-blue/10 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-unicer-blue">
            <Package className="h-5 w-5 text-unicer-red" />
            Itens ({catalog.items.length})
          </h2>
          <select
            value={filterCategoryId}
            onChange={(e) => setFilterCategoryId(e.target.value)}
            className="rounded-xl border border-unicer-blue/15 bg-muted px-4 py-2 text-sm text-unicer-blue outline-none"
          >
            <option value="all">Todas as categorias</option>
            {sortedCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {filteredItems.length === 0 ? (
          <p className="px-6 py-12 text-center text-unicer-blue/60">
            Nenhum item encontrado.
          </p>
        ) : (
          <ul className="divide-y divide-unicer-blue/10">
            {filteredItems.map((item) => {
              const category = getCategory(item.categoryId);
              const isPecas = category ? isPecasCategory(category) : false;

              return (
                <li key={item.id} className={`px-6 py-4 ${!item.active ? "bg-unicer-blue/[0.02]" : ""}`}>
                  {editId === item.id ? (
                    <form onSubmit={(e) => handleSaveEdit(e, item.id)} className="space-y-4">
                      <ItemFields value={editForm} onUpdate={setEditForm} idPrefix={`edit-item-${item.id}`} />
                      {isPecas && (
                        <>
                          <div className="rounded-xl border border-unicer-blue/10 bg-unicer-blue/[0.03] px-4 py-3 text-sm text-unicer-blue/70">
                            <p className="font-medium text-unicer-blue">Fotos pela pasta do projeto</p>
                            <p className="mt-1">
                              Coloque até 4 imagens (JPG, PNG ou WebP) em{" "}
                              <code className="rounded bg-white px-1.5 py-0.5 text-xs text-unicer-red">
                                public/pecas/{getPecasImageFolder(item.id)}/
                              </code>
                              . O site detecta automaticamente ao salvar/atualizar a página.
                            </p>
                          </div>
                          <ItemImageUploader item={item} onUpdate={updateItemInCatalog} />
                        </>
                      )}
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
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className={`font-semibold ${item.active ? "text-unicer-blue" : "text-unicer-blue/50"}`}>
                            {item.title}
                          </h3>
                          <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${item.active ? "bg-green-100 text-green-700" : "bg-unicer-blue/10 text-unicer-blue/50"}`}>
                            {item.active ? "Ativo" : "Inativo"}
                          </span>
                          {category && (
                            <span className="rounded-full bg-unicer-blue/5 px-2.5 py-0.5 text-xs text-unicer-blue/70">
                              {category.label}
                            </span>
                          )}
                          {isPecas && item.images.length > 0 && (
                            <span className="rounded-full bg-unicer-red/10 px-2.5 py-0.5 text-xs text-unicer-red">
                              {item.images.length} foto{item.images.length !== 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-unicer-blue/65">
                          {isPecas ? item.summary : item.description}
                        </p>
                        {item.icon && (
                          <span className="mt-2 inline-block text-xs text-unicer-blue/45">
                            Ícone: {ICON_LABELS[item.icon]}
                          </span>
                        )}
                      </div>
                      <div className="flex shrink-0 gap-1">
                        <button type="button" onClick={() => handleToggle(item)} disabled={busyId === item.id} className="rounded-lg p-2 text-unicer-blue/60 hover:bg-unicer-blue/5 disabled:opacity-50">
                          {busyId === item.id ? <Loader2 className="h-5 w-5 animate-spin" /> : item.active ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
                        </button>
                        <button type="button" onClick={() => startEdit(item)} className="rounded-lg p-2 text-unicer-blue hover:bg-unicer-blue/5">
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button type="button" onClick={() => handleDelete(item.id)} disabled={busyId === item.id} className="rounded-lg p-2 text-unicer-red hover:bg-unicer-red/10 disabled:opacity-50">
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

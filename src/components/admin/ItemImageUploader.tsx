"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { MAX_ITEM_IMAGES, type CatalogItem } from "@/types/catalog";

interface ItemImageUploaderProps {
  item: CatalogItem;
  onUpdate: (item: CatalogItem) => void;
}

export function ItemImageUploader({ item, onUpdate }: ItemImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState<string | null>(null);
  const [error, setError] = useState("");

  const canAdd = item.images.length < MAX_ITEM_IMAGES;

  const handleUpload = async (files: FileList | null) => {
    if (!files?.length || !canAdd) return;

    setError("");
    setUploading(true);

    let latest = item;

    for (const file of Array.from(files).slice(0, MAX_ITEM_IMAGES - latest.images.length)) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/items/${item.id}/images`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json()) as { error?: string };
        setError(data.error || "Erro ao enviar imagem");
        break;
      }

      latest = (await res.json()) as CatalogItem;
    }

    setUploading(false);
    onUpdate(latest);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleRemove = async (imagePath: string) => {
    if (!confirm("Remover esta imagem?")) return;

    setError("");
    setRemoving(imagePath);

    const res = await fetch(
      `/api/items/${item.id}/images?path=${encodeURIComponent(imagePath)}`,
      { method: "DELETE" }
    );

    setRemoving(null);

    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error || "Erro ao remover imagem");
      return;
    }

    onUpdate((await res.json()) as CatalogItem);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-unicer-blue">
          Fotos do produto ({item.images.length}/{MAX_ITEM_IMAGES})
        </p>
        {canAdd && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-1.5 rounded-lg border border-unicer-blue/15 px-3 py-1.5 text-xs font-medium text-unicer-blue hover:bg-unicer-blue/5 disabled:opacity-60"
          >
            {uploading ? (
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ImagePlus className="h-3.5 w-3.5" />
            )}
            Adicionar foto
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={(e) => handleUpload(e.target.files)}
      />

      {item.images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {item.images.map((src) => (
            <div
              key={src}
              className="group relative aspect-square overflow-hidden rounded-xl border border-unicer-blue/10 bg-muted"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                sizes="120px"
              />
              <button
                type="button"
                onClick={() => handleRemove(src)}
                disabled={removing === src}
                className="absolute right-1.5 top-1.5 rounded-lg bg-black/60 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
                aria-label="Remover imagem"
              >
                {removing === src ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-unicer-blue/15 bg-muted/50 px-4 py-6 text-center text-sm text-unicer-blue/50">
          Nenhuma foto adicionada. Envie até {MAX_ITEM_IMAGES} imagens (JPG, PNG ou WebP).
        </p>
      )}

      {error && <p className="text-sm text-unicer-red">{error}</p>}
    </div>
  );
}

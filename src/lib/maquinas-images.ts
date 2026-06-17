import { promises as fs } from "fs";
import path from "path";
import { MAX_ITEM_IMAGES } from "@/types/catalog";
import {
  getMaquinasImageFolder,
  MAQUINAS_IMAGE_FOLDERS,
} from "@/lib/maquinas-image-folders";

const MAQUINAS_ROOT = path.join(process.cwd(), "public", "maquinas");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export { getMaquinasImageFolder, MAQUINAS_IMAGE_FOLDERS };

async function listImagesInDir(dir: string, urlPrefix: string): Promise<string[]> {
  const images: string[] = [];

  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isFile() && IMAGE_EXT.test(entry.name)) {
        images.push(`${urlPrefix}/${entry.name}`);
      }
    }
  } catch {
    // pasta ainda não existe
  }

  return images;
}

export async function discoverMaquinasImages(itemId: string): Promise<string[]> {
  const folder = getMaquinasImageFolder(itemId);
  const fromFolder = await listImagesInDir(
    path.join(MAQUINAS_ROOT, folder),
    `/maquinas/${folder}`
  );

  const fromRoot = await listImagesInDir(MAQUINAS_ROOT, "/maquinas");
  const prefix = folder.toLowerCase();
  const rootMatches = fromRoot.filter((url) => {
    const name = path.basename(url).toLowerCase();
    return name.startsWith(prefix);
  });

  return [...new Set([...fromFolder, ...rootMatches])].slice(0, MAX_ITEM_IMAGES);
}

export async function ensureMaquinasFolders(): Promise<void> {
  await fs.mkdir(MAQUINAS_ROOT, { recursive: true });

  for (const { folder } of MAQUINAS_IMAGE_FOLDERS) {
    await fs.mkdir(path.join(MAQUINAS_ROOT, folder), { recursive: true });
  }
}

import { promises as fs } from "fs";
import path from "path";
import { MAX_ITEM_IMAGES } from "@/types/catalog";
import {
  getPecasImageFolder,
  PECAS_IMAGE_FOLDERS,
} from "@/lib/pecas-image-folders";

const PECAS_ROOT = path.join(process.cwd(), "public", "pecas");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export { getPecasImageFolder, PECAS_IMAGE_FOLDERS };

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

export async function discoverPecasImages(itemId: string): Promise<string[]> {
  const folder = getPecasImageFolder(itemId);
  const fromFolder = await listImagesInDir(
    path.join(PECAS_ROOT, folder),
    `/pecas/${folder}`
  );

  const fromRoot = await listImagesInDir(PECAS_ROOT, "/pecas");
  const prefix = folder.toLowerCase();
  const rootMatches = fromRoot.filter((url) => {
    const name = path.basename(url).toLowerCase();
    return name.startsWith(prefix);
  });

  return [...new Set([...fromFolder, ...rootMatches])].slice(0, MAX_ITEM_IMAGES);
}

export async function ensurePecasFolders(): Promise<void> {
  await fs.mkdir(PECAS_ROOT, { recursive: true });

  for (const { folder } of PECAS_IMAGE_FOLDERS) {
    await fs.mkdir(path.join(PECAS_ROOT, folder), { recursive: true });
  }
}

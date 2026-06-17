import { promises as fs } from "fs";
import path from "path";

const USINAGEM_ROOT = path.join(process.cwd(), "public", "usinagem");
const IMAGE_EXT = /\.(jpe?g|png|webp)$/i;

export async function discoverUsinagemImages(): Promise<string[]> {
  const images: string[] = [];

  try {
    const entries = await fs.readdir(USINAGEM_ROOT, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isFile() && IMAGE_EXT.test(entry.name)) {
        images.push(`/usinagem/${entry.name}`);
      }
    }
  } catch {
    // pasta ainda não existe
  }

  return images;
}

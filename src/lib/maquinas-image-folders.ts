/** Pasta em public/maquinas/ — padrão: id do item sem o prefixo "mN-" */
const MAQUINAS_FOLDER_OVERRIDES: Record<string, string> = {};

export function getMaquinasImageFolder(itemId: string): string {
  return MAQUINAS_FOLDER_OVERRIDES[itemId] ?? itemId.replace(/^m\d+-/, "");
}

export const MAQUINAS_IMAGE_FOLDERS: {
  itemId: string;
  folder: string;
  title: string;
}[] = [
  { itemId: "m1-bomba-agua", folder: "bomba-agua", title: "Bomba de vácuo à água" },
  { itemId: "m2-bomba-oleo", folder: "bomba-oleo", title: "Bomba de vácuo à óleo" },
  { itemId: "m3-desintegrador", folder: "desintegrador", title: "Desintegrador Unicer 600" },
  { itemId: "m4-laminador", folder: "laminador", title: "Laminador Unicer 600" },
  {
    itemId: "m5-maromba-bonfanti",
    folder: "maromba-bonfanti",
    title: "Maromba Bonfanti MVB-14/110 reformada",
  },
  {
    itemId: "m6-maromba-morando",
    folder: "maromba-morando",
    title: "Maromba Morando MVP-4 reformada",
  },
  { itemId: "m7-torre", folder: "torre", title: "Torre de resfriamento" },
];

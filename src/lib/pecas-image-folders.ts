/** Pasta em public/pecas/ — padrão: id do item sem o prefixo "p-" */
const PECAS_FOLDER_OVERRIDES: Record<string, string> = {
  "p-acumulador-argila": "acumulador",
};

export function getPecasImageFolder(itemId: string): string {
  return PECAS_FOLDER_OVERRIDES[itemId] ?? itemId.replace(/^p-/, "");
}

export const PECAS_IMAGE_FOLDERS: { itemId: string; folder: string; title: string }[] = [
  { itemId: "p-acumulador-argila", folder: "acumulador", title: "Acumulador de argila" },
  { itemId: "p-anel-bipartido", folder: "anel-bipartido", title: "Anel bi-partido" },
  { itemId: "p-anel-dentado", folder: "anel-dentado", title: "Anel dentado" },
  { itemId: "p-boca-forno", folder: "boca-forno", title: "Boca de forno" },
  { itemId: "p-bujao-eixo-central", folder: "bujao-eixo-central", title: "Bujão do eixo central" },
  { itemId: "p-calcador-aspo", folder: "calcador-aspo", title: "Calcador - aspo" },
  { itemId: "p-calco-resistencia", folder: "calco-resistencia", title: "Calço e resistência" },
  { itemId: "p-caracol-helice", folder: "caracol-helice", title: "Caracol - hélice" },
  { itemId: "p-cilindro", folder: "cilindro", title: "Cilindro (cônico e chavetado)" },
  { itemId: "p-conico-porta-estrela", folder: "conico-porta-estrela", title: "Cônico porta estrela" },
  { itemId: "p-cordoalha-arame", folder: "cordoalha-arame", title: "Cordoalha - arame para corte" },
  { itemId: "p-disco-desgaste", folder: "disco-desgaste", title: "Disco de desgaste" },
  { itemId: "p-disco-fundo", folder: "disco-fundo", title: "Disco de fundo" },
  { itemId: "p-eixo", folder: "eixo", title: "Eixo" },
  { itemId: "p-eixo-pinhão", folder: "eixo-pinhão", title: "Eixo pinhão" },
  { itemId: "p-embreagem-camara", folder: "embreagem-camara", title: "Embreagem - câmara" },
  { itemId: "p-engrenagem", folder: "engrenagem", title: "Engrenagem" },
  { itemId: "p-esteira-caixao-dosador", folder: "esteira-caixao-dosador", title: "Esteira de caixão dosador" },
  { itemId: "p-haste-pa", folder: "haste-pa", title: "Haste - pá (+suplemento)" },
  { itemId: "p-helice-aluminio", folder: "helice-aluminio", title: "Hélice de alumínio/polipropileno" },
  { itemId: "p-pinhão", folder: "pinhão", title: "Pinhão" },
  { itemId: "p-pneu", folder: "pneu", title: "Pneu" },
  { itemId: "p-pneu-embreagem", folder: "pneu-embreagem", title: "Pneu para embreagem" },
  { itemId: "p-ponteira-suplemento-borda", folder: "ponteira-suplemento-borda", title: "Ponteira - suplemento - borda" },
  { itemId: "p-revestimento-camisa", folder: "revestimento-camisa", title: "Revestimento - camisa" },
  { itemId: "p-roda", folder: "roda", title: "Roda" },
  { itemId: "p-roda-vagoneta", folder: "roda-vagoneta", title: "Roda vagoneta" },
  { itemId: "p-rotor-desintegrador", folder: "rotor-desintegrador", title: "Rotor desintegrador" },
];

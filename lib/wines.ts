// src/lib/wines.ts
export const WINES = [
  // === TINTOS SECOS (ENCORPADOS) ===
  { name: "Miolo Terroir Merlot", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Vale dos Vinhedos - RS" },
  { name: "Salton Classic Tannat", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Campanha Gaúcha - RS" },
  { name: "Pizzato Concentus", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Vale dos Vinhedos - RS" },
  { name: "Casa Valduga Gran Cabernet Franc", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Serra Gaúcha - RS" },
  { name: "Guaspari Syrah Vista do Chá", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Espírito Santo do Pinhal - SP" },
  { name: "Villa Francioni Micheletto", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "São Joaquim - SC" },
  { name: "Lidio Carraro Dádivas Tempranillo", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Encruzilhada do Sul - RS" },
  { name: "Cabernet Sauvignon", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Internacional" },
  { name: "Malbec", type: "Tinto seco", body: "Encorpado", sweetness: "Seco", region: "Argentina" },
  { name: "Pinot Noir", type: "Tinto seco", body: "Leve a médio", sweetness: "Seco", region: "Borgonha / Internacional" },

  // === TINTOS MEIO-SECOS / SUAVES ===
  { name: "Cave de Pedra Merlot", type: "Tinto meio-seco", body: "Médio", sweetness: "Meio-seco", region: "Bento Gonçalves - RS" },
  { name: "Aurora Procedências Merlot", type: "Tinto meio-seco", body: "Médio", sweetness: "Meio-seco", region: "Serra Gaúcha - RS" },

  // === BRANCOS SECOS ===
  { name: "Guaspari Sauvignon Blanc", type: "Branco seco", body: "Leve", sweetness: "Seco", region: "Espírito Santo do Pinhal - SP" },
  { name: "Sauvignon Blanc", type: "Branco seco", body: "Leve", sweetness: "Seco", region: "Nova Zelândia / Loire" },
  { name: "Chardonnay (sem carvalho)", type: "Branco seco", body: "Médio", sweetness: "Seco", region: "Chablis / Internacional" },
  { name: "Pinot Grigio", type: "Branco seco", body: "Leve", sweetness: "Seco", region: "Itália" },
  { name: "Albariño", type: "Branco seco", body: "Leve", sweetness: "Seco", region: "Espanha" },

  // === BRANCOS MEIO-SECOS / AROMÁTICOS ===
  { name: "Riesling", type: "Branco meio-seco", body: "Leve a médio", sweetness: "Meio-seco / Off-dry", region: "Alemanha / Alsácia" },
  { name: "Gewürztraminer", type: "Branco meio-seco", body: "Médio", sweetness: "Meio-seco", region: "Alsácia" },
  { name: "Viognier", type: "Branco meio-seco", body: "Médio", sweetness: "Meio-seco", region: "Rhône - França" },

  // === BRANCOS DOCES ===
  { name: "Casa Perini Moscatel", type: "Espumante doce", body: "Leve", sweetness: "Doce", region: "Farroupilha - RS" },
  { name: "Moscato d'Asti", type: "Espumante doce", body: "Leve", sweetness: "Doce", region: "Itália" },

  // === ROSÉS ===
  { name: "Aurora Rosé Pinot Noir", type: "Rosé seco", body: "Leve", sweetness: "Seco", region: "Pinto Bandeira - RS" },
  { name: "Rosé Provença", type: "Rosé seco", body: "Leve", sweetness: "Seco", region: "França" },

  // === ESPUMANTES SECOS ===
  { name: "Salton Prosecco", type: "Espumante seco", body: "Leve", sweetness: "Brut", region: "Serra Gaúcha - RS" },
  { name: "Prosecco", type: "Espumante seco", body: "Leve", sweetness: "Brut", region: "Itália" },
  { name: "Champagne Brut", type: "Espumante seco", body: "Leve", sweetness: "Brut", region: "França" },

  // === FORTIFICADOS / DOCES ===
  { name: "Porto Tawny", type: "Fortificado doce", body: "Encorpado", sweetness: "Doce", region: "Portugal" },
  { name: "Pedro Ximénez (PX)", type: "Fortificado doce", body: "Encorpado", sweetness: "Muito doce", region: "Espanha" }
];

// Função que gera a lista formatada para o prompt do LLM
export function buildWinesString() {
  return WINES.map((wine, index) => 
    `${index + 1}. ${wine.name} → ${wine.type} | Corpo: ${wine.body} | Doçura: ${wine.sweetness} | ${wine.region || "Internacional"}`
  ).join("\n");
}
// src/app/api/recommend/route.ts
import { NextRequest } from "next/server";
import { Groq } from "groq-sdk";
import { WINES, buildWinesString } from "@/lib/wines";

export async function POST(req: NextRequest) {
  const { dish, groqKey } = await req.json();

  if (!dish || dish.trim().length < 5)
    return Response.json({ error: "Descreva o prato" }, { status: 400 });
  if (!groqKey || !groqKey.startsWith("gsk_"))
    return Response.json({ error: "Cole sua chave Groq (gsk_...)" }, { status: 400 });

  const groq = new Groq({ apiKey: groqKey });

  const prompt = `Você é um Master Sommelier brasileiro, especialista em vinhos nacionais e apaixonado por harmonização.

Prato do cliente: ${dish}

Adega disponível (ESCOLHA APENAS destes vinhos – NUNCA invente outro):

${buildWinesString()}

REGRAS OBRIGATÓRIAS (se desobedecer, será penalizado):
1. Retorne EXATAMENTE 3 vinhos, sempre diferentes entre si.
2. Considere as características do prato como: ingredientes principais, tipo de carne ou vegetariano, tempero, acidez, intensidade do sabor.
3. Nunca repita justificativa parecida com respostas anteriores.
4. Justificativa rica, em português brasileiro fluente, com no mínimo 2 frases completas e técnicas (fale de taninos, acidez, corpo, contraste/congruência, etc).

Formato OBRIGATÓRIO (nem uma palavra a mais, nem título, nem introdução):

1. [Nome exato do vinho]
Justificativa: [explicação completa aqui]

2. [Nome exato do vinho]
Justificativa: [explicação completa aqui]

3. [Nome exato do vinho]
Justificativa: [explicação completa aqui]`;


  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "llama-3.3-70b-versatile",
      temperature: 0.8,
      max_tokens: 800,
    });

    const text = chatCompletion.choices[0]?.message?.content || "";

    const recommendations: { name: string; justification: string }[] = [];
    let current: any = null;
    for (const line of text.split("\n")) {
      const t = line.trim();
      if (/^\d+\.\s/.test(t)) {
        if (current) recommendations.push(current);
        current = { name: t.replace(/^\d+\.\s*/, ""), justification: "" };
      } else if (t.toLowerCase().startsWith("justificativa:")) {
        if (current) current.justification = t.replace(/^justificativa:\s*/i, "");
      } else if (current && t) {
        current.justification += " " + t;
      }
    }
    if (current) recommendations.push(current);

    return Response.json({ recommendations });
  } catch (error: any) {
    console.error("Erro completo:", error);
    return Response.json({ error: "Erro Groq: " + (error.message || "Tente novamente") }, { status: 500 });
  }
}
"use client";

import { useState } from "react";
import { Wine, Loader2, Sparkles, Key } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Rec = { name: string; justification: string };

export default function Home() {
  const [dish, setDish] = useState("");
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [recs, setRecs] = useState<Rec[]>([]);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setRecs([]); setLoading(true);

    const res = await fetch("/api/recommend", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dish, groqKey: key }),
    });

    const data = await res.json();
    setLoading(false);
    if (data.error) setError(data.error);
    else setRecs(data.recommendations);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-5xl mx-auto p-6 pt-12">
        <div className="text-center mb-10">
          <h1 className="text-6xl font-bold text-amber-900 flex items-center justify-center gap-4">
            <Wine className="w-16 h-16" /> Sommelier IA
          </h1>
          <p className="text-2xl text-amber-700 mt-4">Seu sommelier de vinhos pessoal com poder de IA</p>
        </div>

        <Card className="p-10 shadow-2xl">
          <form onSubmit={submit} className="space-y-8">
            <div>
              <label className="flex items-center gap-2 text-lg font-semibold mb-3">
                <Key className="w-5 h-5" /> Chave Groq (gsk_...)
              </label>
              <Input
                type="password"
                placeholder="Cole sua chave aqui"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="font-mono"
                required
              />
              {key.startsWith("gsk_") && <Badge className="mt-2">Chave válida!</Badge>}
            </div>

            <div>
              <label className="block text-lg font-semibold mb-3">Descreva o prato</label>
              <Textarea
                placeholder="Ex: Filé ao molho madeira com risoto de parmesão"
                value={dish}
                onChange={(e) => setDish(e.target.value)}
                className="min-h-32"
                required
              />
            </div>

            <Button type="submit" size="lg" disabled={loading || !key} className="w-full bg-orange-600 hover:bg-orange-700">
              {loading ? <><Loader2 className="mr-2 animate-spin" /> Consultando Llama...</> : <><Sparkles className="mr-2" /> Recomendar vinhos</>}
            </Button>
          </form>
        </Card>

        {error && <Alert variant="destructive" className="mt-8"><AlertDescription>{error}</AlertDescription></Alert>}

        {recs.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {recs.map((r, i) => (
              <Card key={i} className={`p-8 ${i === 0 ? "ring-4 ring-amber-500" : ""}`}>
                <Badge className="mb-4">{i === 0 ? "Melhor escolha" : i === 1 ? "Excelente" : "Ótima"}</Badge>
                <h3 className="text-2xl font-bold text-amber-800 mb-4">{r.name}</h3>
                <Separator className="mb-4" />
                <p className="text-gray-700">{r.justification}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
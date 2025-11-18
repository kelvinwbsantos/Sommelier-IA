# Sommelair – Recomendador Inteligente de Vinhos com IA

**Sommelair** é um sistema web completo que recomenda as 3 melhores harmonizações de vinho para qualquer prato, usando o poderoso **Llama 3.3 70B** (um dos melhores modelos open-source do mundo) na infraestrutura ultra-rápida da **Groq**.

- 100 % gratuito (Groq free tier)  
- Respostas em menos de 1 segundo  
- Mais de 30 vinhos reais
- Interface moderna e responsiva
- Zero custo de operação, mesmo em produção

Deploy: https://sommelier-ia.vercel.app/

## Funcionalidades

- Campo seguro para inserir sua chave Groq (grátis em https://console.groq.com/keys)  
- Descreva o prato com ingredientes, preparo e intensidade  
- Receba 3 recomendações ordenadas com justificativas técnicas de Master Sommelier  
- Prioriza vinhos brasileiros quando fazem sentido  
- Variedade garantida (nunca repete os mesmos vinhos)  
- Totalmente em português brasileiro

## Tecnologias

| Camada         | Tecnologia                                           |
|----------------|------------------------------------------------------|
| Framework      | Next.js 14 (App Router) + TypeScript                |
| UI             | Tailwind CSS + Shadcn/ui + Lucide React Icons        |
| IA             | Llama 3.3 70B via Groq API (`llama-3.3-70b-versatile`) |
| Base de vinhos | +30 rótulos categorizados (seco, meio-seco, doce, etc.) |
| Deploy         | Vercel                               |

## Como rodar localmente

```bash
git clone https://github.com/kelvinwbsantos/Sommelier-IA.git
cd sommelair
npm install
npm run dev

import { GoogleGenAI } from "@google/genai";
import { Maintenance, Organ } from "../types";

export const getMaintenanceAnalysis = async (maintenances: Maintenance[], organ: Organ) => {
  if (maintenances.length === 0) return "Nenhuma manutenção registrada para análise.";

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `
    Analise o seguinte histórico de manutenção para o órgão eletrônico:
    Modelo: ${organ.model}
    Patrimônio: ${organ.patrimonyNumber}
    Histórico: ${JSON.stringify(maintenances.map(m => ({ date: m.date, occurrence: m.occurrence, parts: m.partExchangeDetails })))}
    
    Por favor, forneça um resumo profissional em português do estado do instrumento e sugestões preventivas.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Erro ao chamar Gemini:", error);
    return "Não foi possível gerar a análise inteligente no momento.";
  }
};

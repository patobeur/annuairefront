import type { MindMapData, Language } from './types';

export const mindMapData: Record<Language, { nodes: MindMapData['nodes'] }> = {
  en: {
    nodes: [
      { id: 1, title: "AI Engines (LLM & GenAI)", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 2, title: "AI Agents & Agentics", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 3, title: "AI Workflow Automation", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 4, title: "AI Graphic & Video Gen", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 5, title: "AI Music Gen", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 6, title: "AI App Gen (no-code & low-code)", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 7, title: "AI Conversation & Chatbot", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 8, title: "AI Vocal Gen & Cloning", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 9, title: "AI 3D & Vector Gen", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 10, title: "AI Literature Composition", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 11, title: "AI Coding Assistant", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 12, title: "AI Marketplace", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 13, title: "AI Website Gen", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 14, title: "Data Analysis & BI", link: "https://auberon-ai.com/repertoire-ia-fr/" },
    ]
  },
  fr: {
    nodes: [
      { id: 1, title: "Moteurs IA (LLM & GenAI)", link: "https://auberon-ai.com/moteur-ia/" },
      { id: 2, title: "Agents IA & Agentique", link: "https://auberon-ai.com/agents-agentiques-ia/" },
      { id: 3, title: "Automatisation des workflows", link: "https://auberon-ai.com/automatisation-flux-operationnels-workflow/" },
      { id: 4, title: "Générateur Graphiques & Vidéos", link: "https://auberon-ai.com/generateur-graphique-video/" },
      { id: 5, title: "Générateur de Musique", link: "https://auberon-ai.com/generateur-musical/" },
      { id: 6, title: "Générateur d'Applications", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 7, title: "Conversation IA & Chatbot", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 8, title: "Générateur Vocal & Clonage Vocal", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 9, title: "Générateur 3D & Modèles Vectoriel", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 10, title: "Composition littéraire", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 11, title: "Assistant de Codage", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 12, title: "Marketplace de l'IA", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 13, title: "Générateur de sites Web", link: "https://auberon-ai.com/repertoire-ia-fr/" },
      { id: 14, title: "Analyse de Données & BI", link: "https://auberon-ai.com/repertoire-ia-fr/" },
    ]
  }
};
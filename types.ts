export type Language = 'en' | 'fr';

export interface MindMapNode {
  id: number;
  title: string;
  link: string;
}

export interface MindMapData {
  nodes: MindMapNode[];
}
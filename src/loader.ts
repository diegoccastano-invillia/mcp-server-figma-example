import fs from "node:fs/promises";
import path from "node:path";

export interface ToolDef {
  id: string;
  name: string;
  description: string;
  handler: string;
  inputSchema: Record<string, unknown>;
  permissions?: string[];
  tags?: string[];
  resourceRefs?: string[];
}

export interface ResourceDef {
  id: string;
  uri: string;
  name: string;
  description?: string;
  mimeType: string;
  source: { type: "file"; path: string };
  tags?: string[];
}

export interface PromptDef {
  id: string;
  name: string;
  description: string;
  messages: { role: string; content: string }[];
  resourceRefs?: string[];
  toolRefs?: string[];
}

async function loadJson<T>(filePath: string): Promise<T> {
  const abs = path.resolve(filePath);
  const raw = await fs.readFile(abs, "utf-8");
  return JSON.parse(raw) as T;
}

export async function loadManifest(baseDir = "./manifest") {
  const [tools, resources, prompts] = await Promise.all([
    loadJson<ToolDef[]>(path.join(baseDir, "tools.json")),
    loadJson<ResourceDef[]>(path.join(baseDir, "resources.json")),
    loadJson<PromptDef[]>(path.join(baseDir, "prompts.json")),
  ]);
  return { tools, resources, prompts };
}

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs/promises";
import path from "node:path";
import type { ToolDef, ResourceDef, PromptDef } from "./loader.js";

const handlerCache = new Map<string, (args: Record<string, unknown>) => Promise<unknown>>();

async function getHandler(handlerPath: string) {
  if (!handlerCache.has(handlerPath)) {
    const abs = path.resolve("src", handlerPath);
    const mod = await import(abs);
    handlerCache.set(handlerPath, mod.run ?? mod.default);
  }
  return handlerCache.get(handlerPath)!;
}

export function registerTools(server: Server, tools: ToolDef[]) {
  server.setRequestHandler(ListToolsRequestSchema, async () => ({
    tools: tools.map((t) => ({
      name: t.name,
      description: t.description,
      inputSchema: t.inputSchema,
    })),
  }));

  server.setRequestHandler(CallToolRequestSchema, async (req) => {
    const toolDef = tools.find((t) => t.name === req.params.name);
    if (!toolDef) {
      return { content: [{ type: "text", text: `Tool não encontrada: ${req.params.name}` }], isError: true };
    }
    const handler = await getHandler(toolDef.handler);
    const result = await handler(req.params.arguments ?? {});
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  });
}

export function registerResources(server: Server, resources: ResourceDef[]) {
  server.setRequestHandler(ListResourcesRequestSchema, async () => ({
    resources: resources.map((r) => ({
      uri: r.uri,
      name: r.name,
      description: r.description,
      mimeType: r.mimeType,
    })),
  }));

  server.setRequestHandler(ReadResourceRequestSchema, async (req) => {
    const res = resources.find((r) => r.uri === req.params.uri);
    if (!res) throw new Error(`Resource não encontrado: ${req.params.uri}`);
    const content = await fs.readFile(path.resolve(res.source.path), "utf-8");
    return {
      contents: [{ uri: res.uri, mimeType: res.mimeType, text: content }],
    };
  });
}

export function registerPrompts(server: Server, prompts: PromptDef[]) {
  server.setRequestHandler(ListPromptsRequestSchema, async () => ({
    prompts: prompts.map((p) => ({
      name: p.name,
      description: p.description,
    })),
  }));

  server.setRequestHandler(GetPromptRequestSchema, async (req) => {
    const prompt = prompts.find((p) => p.name === req.params.name);
    if (!prompt) throw new Error(`Prompt não encontrado: ${req.params.name}`);
    return { messages: prompt.messages };
  });
}

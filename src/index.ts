import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadManifest } from "./loader.js";
import { registerTools, registerResources, registerPrompts } from "./registry.js";

async function main() {
  const server = new Server(
    { name: "mcp-server-figma-example", version: "1.0.0" },
    { capabilities: { tools: {}, resources: {}, prompts: {} } }
  );

  const manifest = await loadManifest("./manifest");

  console.error(
    `[manifest] ${manifest.tools.length} tools, ${manifest.resources.length} resources, ${manifest.prompts.length} prompts carregados.`
  );

  registerTools(server, manifest.tools);
  registerResources(server, manifest.resources);
  registerPrompts(server, manifest.prompts);

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[server] MCP Server rodando via stdio.");
}

main().catch(console.error);

# MCP Server — Exemplo de Externalização (inspirado no Figma)

Exemplo didático de um **MCP Server** (Model Context Protocol) que demonstra como **externalizar a definição de Tools, Resources e Prompts em arquivos JSON**, em vez de declará-los diretamente no código.

A inspiração vem das ferramentas oficiais do [Figma MCP Server](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/).

---

## O que é

Este projeto mostra o padrão de **externalização**: em vez de registrar cada tool/resource/prompt no código TypeScript, você os declara em **manifests JSON** (`manifest/tools.json`, `manifest/resources.json`, `manifest/prompts.json`). O server lê esses JSONs no startup e registra tudo automaticamente.

**Vantagens:**
- Adicionar/remover tools sem alterar código do server
- Separação clara entre "o que o server oferece" (JSON) e "como ele funciona" (TypeScript)
- Facilita governança, revisão e versionamento das capacidades

---

## Conceito

```
┌─────────────────────────────────────────────────┐
│                 manifest/*.json                  │
│  (tools.json / resources.json / prompts.json)   │
└────────────────────┬────────────────────────────┘
                     │ lê no startup
                     ▼
┌─────────────────────────────────────────────────┐
│               src/loader.ts                      │
│   Carrega e valida os JSONs → objetos tipados   │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│              src/registry.ts                     │
│   Registra handlers MCP (list/call/read/get)    │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────┐
│               src/index.ts                       │
│   Entry point: load → register → connect        │
└─────────────────────────────────────────────────┘
```

---

## Estrutura de pastas

```
├── manifest/
│   ├── tools.json          ← Tools externalizadas (inspiradas no Figma)
│   ├── resources.json      ← Resources externalizados
│   └── prompts.json        ← Prompts externalizados
├── resources/
│   ├── design-system-rules.md
│   └── schemas/
│       └── figma-node.schema.json
├── src/
│   ├── index.ts            ← Entry point do MCP Server
│   ├── loader.ts           ← Carrega manifest JSONs
│   ├── registry.ts         ← Registra tools/resources/prompts no server
│   └── handlers/
│       ├── get-design-context.ts
│       ├── get-screenshot.ts
│       ├── get-variable-defs.ts
│       ├── get-code-connect-map.ts
│       └── get-metadata.ts
├── package.json
├── tsconfig.json
└── README.md
```

---

## Como rodar

```bash
# Instalar dependências
npm install

# Rodar em modo dev (com tsx, sem precisar compilar)
npm run dev

# Ou compilar e rodar
npm run build
npm start
```

---

## Como adicionar novas tools/resources/prompts

### Nova Tool
1. Adicione um novo objeto em `manifest/tools.json`
2. Crie o handler em `src/handlers/<nome>.ts` (exportando `run(args)`)
3. Reinicie o server

### Novo Resource
1. Adicione um novo objeto em `manifest/resources.json`
2. Coloque o arquivo referenciado em `resources/`
3. Reinicie o server

### Novo Prompt
1. Adicione um novo objeto em `manifest/prompts.json`
2. Reinicie o server

> **O server não precisa ser alterado** — só os JSONs e (se for tool) o handler.

---

## Tabela resumo

| Camada | Arquivo | Papel |
|---|---|---|
| **Manifesto de Tools** | `manifest/tools.json` | Declara nome, schema, handler, permissões — sem código |
| **Manifesto de Resources** | `manifest/resources.json` | Declara URI, mime, caminho do arquivo estático |
| **Manifesto de Prompts** | `manifest/prompts.json` | Declara mensagens, quais tools/resources o prompt usa |
| **Loader** | `src/loader.ts` | Lê os 3 JSONs e devolve objetos tipados |
| **Registry** | `src/registry.ts` | Registra tudo no MCP Server (handlers MCP oficiais) |
| **Entry point** | `src/index.ts` | Cola tudo: load → register → connect |
| **Handlers** | `src/handlers/*.ts` | Lógica de cada tool (um arquivo por tool) |

---

## Referências

- [Figma MCP Server — Tools and Prompts (oficial)](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Figma MCP Server — Introdução](https://developers.figma.com/docs/figma-mcp-server/)
- [MCP SDK (npm)](https://www.npmjs.com/package/@modelcontextprotocol/sdk)
- [Model Context Protocol — Specification](https://modelcontextprotocol.io/)
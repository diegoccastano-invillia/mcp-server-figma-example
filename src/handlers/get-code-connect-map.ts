export async function run(args: Record<string, unknown>) {
  const { fileKey, nodeIds } = args as {
    fileKey: string;
    nodeIds?: string[];
  };

  return {
    fileKey,
    mappings: [
      { nodeId: "12:36", component: "Button", importPath: "@/components/ui/Button" },
      { nodeId: "12:40", component: "Card", importPath: "@/components/ui/Card" },
      { nodeId: "12:50", component: "Avatar", importPath: "@/components/ui/Avatar" },
    ].filter((m) => !nodeIds || nodeIds.includes(m.nodeId)),
  };
}

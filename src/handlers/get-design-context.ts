export async function run(args: Record<string, unknown>) {
  const { fileKey, nodeId, depth = 2 } = args as {
    fileKey: string;
    nodeId: string;
    depth?: number;
  };

  return {
    fileKey,
    nodeId,
    depth,
    context: {
      name: "Frame Hero Section",
      type: "FRAME",
      children: [
        { id: "12:35", name: "Title", type: "TEXT", content: "Welcome" },
        { id: "12:36", name: "CTA Button", type: "COMPONENT", variant: "primary" },
      ],
      styles: {
        background: "#FFFFFF",
        padding: "24px",
      },
    },
  };
}

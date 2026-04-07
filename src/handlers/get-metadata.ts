export async function run(args: Record<string, unknown>) {
  const { fileKey, nodeId, outputFormat = "json" } = args as {
    fileKey: string;
    nodeId?: string;
    outputFormat?: string;
  };

  return {
    fileKey,
    outputFormat,
    nodes: [
      { id: "0:1", name: "Page 1", type: "CANVAS", bounds: { x: 0, y: 0, width: 4000, height: 3000 } },
      { id: "12:34", name: "Hero Section", type: "FRAME", bounds: { x: 0, y: 0, width: 1440, height: 900 } },
      { id: "12:35", name: "Title", type: "TEXT", bounds: { x: 120, y: 200, width: 600, height: 48 } },
      { id: "12:36", name: "CTA Button", type: "COMPONENT", bounds: { x: 120, y: 280, width: 200, height: 48 } },
    ],
  };
}

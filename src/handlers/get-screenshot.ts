export async function run(args: Record<string, unknown>) {
  const { fileKey, nodeId, format = "png", scale = 2 } = args as {
    fileKey: string;
    nodeId: string;
    format?: string;
    scale?: number;
  };

  return {
    fileKey,
    nodeId,
    format,
    scale,
    imageUrl: `https://figma-assets.example.com/${fileKey}/${nodeId}.${format}?scale=${scale}`,
    width: 1440,
    height: 900,
  };
}

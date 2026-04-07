export async function run(args: Record<string, unknown>) {
  const { fileKey, nodeId, includeRemote = false } = args as {
    fileKey: string;
    nodeId?: string;
    includeRemote?: boolean;
  };

  return {
    fileKey,
    nodeId: nodeId ?? null,
    includeRemote,
    variables: [
      { name: "color-primary", type: "COLOR", value: "#6366F1", scope: "ALL_SCOPES" },
      { name: "color-secondary", type: "COLOR", value: "#EC4899", scope: "ALL_SCOPES" },
      { name: "spacing-md", type: "FLOAT", value: 16, scope: "GAP" },
      { name: "font-heading", type: "STRING", value: "Inter", scope: "FONT_FAMILY" },
    ],
  };
}

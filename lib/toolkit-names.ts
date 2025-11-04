// Stanford Ethics Toolkit tool names
export const TOOLKIT_NAMES: Record<string, string> = {
  'T1': 'Impacts Explorer',
  'T2': 'Values Clarifier',
  'T3': 'Risks Anticipator',
  'T4': 'Alternatives Generator',
  'T5': 'Accountability Builder'
};

export function extractToolName(prompt: string): string | null {
  const match = prompt.match(/^(T[1-5])\s+/);
  return match ? TOOLKIT_NAMES[match[1]] || null : null;
}

export function getToolkitToolsUsed(flow: { order: string[] }): string[] {
  return flow.order.map(t => TOOLKIT_NAMES[t] || t).filter(Boolean);
}


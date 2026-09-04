// Syncs the shadcn registry JSON with the canonical component source.
//
// Why: the shadcn CLI does NOT fetch remote `content` URLs — the component
// source must be inlined in order-button.json. Run this after EVERY edit to
// OrderButton.jsx, or installs will ship stale code.
//
// Usage (from the "Order Button" folder):
//   node registry/sync.mjs

import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const registryDir = dirname(fileURLToPath(import.meta.url));
const componentDir = join(registryDir, "..");

const src = readFileSync(join(componentDir, "OrderButton.jsx"), "utf8");

const registry = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "order-button",
  type: "registry:ui",
  title: "Order Button",
  author: "masumislambadsha",
  description:
    "Animated order button with truck delivery micro-interaction. Controlled via isProcessing.",
  dependencies: [],
  registryDependencies: [],
  tailwind: { config: {} },
  files: [
    {
      path: "components/ui/order-button.jsx",
      target: "components/ui/order-button.jsx",
      type: "registry:ui",
      content: src,
    },
  ],
};

writeFileSync(
  join(registryDir, "order-button.json"),
  JSON.stringify(registry)
);

console.log(
  `synced order-button.json with OrderButton.jsx (${src.length} source bytes)`
);

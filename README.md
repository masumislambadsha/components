# components

A public collection of reusable UI components by [@masumislambadsha](https://github.com/masumislambadsha).

[![GitHub stars](https://img.shields.io/github/stars/masumislambadsha/components?style=social)](https://github.com/masumislambadsha/components/stargazers)
[![jsDelivr hits](https://img.shields.io/jsdelivr/gh/hm/masumislambadsha/components)](https://data.jsdelivr.com/v1/stats/packages/gh/masumislambadsha/components)

## Order Button

Animated order/add-to-cart button with a truck-delivery micro-interaction. Controlled via `isProcessing`, disabled while processing, `aria-busy` + `aria-live` announcements, `prefers-reduced-motion` support.

![Order Button demo](Order%20Button/demo.gif)

### Install (shadcn-compatible registry)

```bash
npx shadcn@latest add https://cdn.jsdelivr.net/gh/masumislambadsha/components@main/registry/order-button.json
```

Or copy the single file [`Order Button/OrderButton.jsx`](Order%20Button/OrderButton.jsx) into your project — React + Tailwind only, no other dependencies.

### Usage

```jsx
import OrderButton from "./OrderButton";

const [busy, setBusy] = useState(false);

<OrderButton
  onClick={() => {
    setBusy(true);
    setTimeout(() => setBusy(false), 6000);
  }}
  isProcessing={busy}
  defaultLabel="Confirm Order"
  successLabel="Order Placed"
/>
```

Props: `onClick`, `isProcessing`, `disabled`, `defaultLabel`, `successLabel`,
`variant` (`red`/`primary`/`amber`/`accent`), `size` (`sm`/`md`/`lg`),
`durationMs` (default `6000`), `type`, `className`, `style`, `ariaLabel`.

### Variants in this repo

| Path | For |
| ---- | --- |
| `Order Button/OrderButton.jsx` | Canonical version (React + Tailwind, JS) |
| `ports/magicui/order-button.tsx` | TypeScript port (`forwardRef`, typed props) — shadcn/MagicUI-style projects |
| `ports/heroui/OrderButton.tsx` | HeroUI-style port (`tailwind-variants` `tv()` config) |
| `ports/react-bits/` | CSS-Modules variant (`OrderButton.jsx` + `OrderButton.module.css`, no Tailwind needed for the animation) |
| `uiverse/` | Pure HTML + CSS version (checkbox hack, no JS) for uiverse.io submits |
| `registry/order-button.json` | shadcn registry definition pointing at the canonical file |

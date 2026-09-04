"use client";

/**
 * Order Button — HeroUI-style port.
 *
 * Styled with `tailwind-variants` (`tv()`), mirroring the `buttonVariants`
 * pattern from `@heroui/styles` (base + variants + defaultVariants).
 * Drop into `packages/components/<new-component>/` following the repo's
 * CONTRIBUTING.md, add docs under `apps/docs/content/docs/components/`.
 *
 * Controlled: parent owns `isProcessing`. Disabled while processing.
 */

import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const orderButtonVariants = tv({
  base: "order-btn relative w-full overflow-hidden rounded-xl font-bold transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
  defaultVariants: {
    size: "lg",
    variant: "primary",
  },
  variants: {
    size: {
      sm: "h-12 text-sm",
      md: "h-14 text-[15px]",
      lg: "h-[63px] text-base",
    },
    variant: {
      primary: "bg-red-500 hover:bg-[#c62828] text-white",
      red: "bg-red-500 hover:bg-[#c62828] text-white",
      accent:
        "bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-[0_10px_24px_rgba(245,158,11,0.35)]",
      amber:
        "bg-amber-400 hover:bg-amber-500 text-slate-900 shadow-[0_10px_24px_rgba(245,158,11,0.35)]",
    },
  },
});

const orderButtonDisabledVariants = tv({
  base: "order-btn relative w-full overflow-hidden rounded-xl font-bold transition-colors duration-300 cursor-not-allowed",
  defaultVariants: { size: "lg", variant: "primary" },
  variants: {
    size: {
      sm: "h-12 text-sm",
      md: "h-14 text-[15px]",
      lg: "h-[63px] text-base",
    },
    variant: {
      primary: "bg-red-500 text-white opacity-70",
      red: "bg-red-500 text-white opacity-70",
      accent: "bg-slate-200 text-slate-400 shadow-none",
      amber: "bg-slate-200 text-slate-400 shadow-none",
    },
  },
});

export interface OrderButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">,
    VariantProps<typeof orderButtonVariants> {
  onClick?: () => void;
  isProcessing?: boolean;
  defaultLabel?: React.ReactNode;
  successLabel?: React.ReactNode;
  /** Animation length in ms. Defaults to 6000 (the full truck story). */
  durationMs?: number;
}

export const OrderButton = React.forwardRef<HTMLButtonElement, OrderButtonProps>(
  (
    {
      onClick,
      isProcessing = false,
      disabled = false,
      defaultLabel = "Confirm Order",
      successLabel = "Order Placed",
      variant = "primary",
      size = "lg",
      durationMs = 6000,
      type = "button",
      className = "",
      style,
      ...rest
    },
    ref
  ) => {
    const isDisabled = disabled || isProcessing;
    const duration = `${durationMs}ms`;
    const successDelay = `${Math.round(durationMs * 0.7)}ms`;
    const tvClasses = isDisabled
      ? orderButtonDisabledVariants({ size, variant })
      : orderButtonVariants({ size, variant });
    const fallbackLabel =
      typeof defaultLabel === "string" ? defaultLabel : "Place order";

    return (
      <button
        ref={ref}
        type={type}
        onClick={onClick}
        disabled={isDisabled}
        aria-busy={isProcessing}
        aria-label={rest["aria-label"] ?? fallbackLabel}
        style={{ "--order-btn-duration": duration, ...style } as React.CSSProperties}
        className={`${tvClasses} ${isProcessing ? "animate" : ""} ${className}`}
        {...rest}
      >
        <span
          aria-hidden={isProcessing}
          className="default absolute inset-x-0 top-1/2 -translate-y-1/2 text-center transition-opacity duration-300"
        >
          {defaultLabel}
        </span>
        <span
          aria-live="polite"
          className="success absolute inset-x-0 top-1/2 -translate-y-1/2 text-center opacity-0"
        >
          {successLabel}
          <svg
            aria-hidden="true"
            viewBox="0 0 12 10"
            className="inline-block ml-1 w-3 h-2.5 stroke-[#4ade80] stroke-2 fill-none"
          >
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
          </svg>
        </span>

        <div
          aria-hidden="true"
          className="box absolute w-[21px] h-[21px] bg-gradient-to-b from-[#EDD9A9] to-[#DCB773] right-full top-[21px] rounded-[2px] opacity-0"
        ></div>

        <div
          aria-hidden="true"
          className="truck absolute left-full top-[11px] w-[60px] h-[41px] translate-x-6 z-[1]"
        >
          <div className="back absolute w-[60px] h-[41px] rounded-[2px] bg-gradient-to-b from-white to-[#CDD9ED] z-[1]"></div>
          <div className="front absolute left-[60px] w-[26px] h-[41px] rounded-l-[2px] rounded-r-[9px] overflow-hidden">
            <div className="window absolute left-0.5 w-[22px] h-[41px] rounded-l-[2px] rounded-r-lg bg-[#7699FF]"></div>
            <div className="absolute right-0 w-6 h-[41px] bg-[#275EFE] rounded-l-[2px] rounded-r-[9px]"></div>
          </div>
          <div className="light absolute left-[83px] top-1 w-[3px] h-2 bg-yellow-300 rounded-[2px]"></div>
          <div className="light absolute left-[83px] bottom-1 w-[3px] h-2 bg-yellow-300 rounded-[2px]"></div>
          <div className="beam absolute left-[86px] top-[5px] h-[31px] w-[38px] bg-gradient-to-r from-yellow-200/90 to-transparent [clip-path:polygon(0_22%,100%_0,100%_100%,0_78%)]"></div>
        </div>

        <div
          aria-hidden="true"
          className="lines absolute top-[30px] left-full w-1.5 h-[3px] bg-white rounded opacity-0"
        ></div>

        <div
          aria-hidden="true"
          className="road absolute inset-x-0 bottom-0 h-[12px] bg-slate-800/90 overflow-hidden"
        >
          <div className="road-dashes absolute inset-x-0 top-1/2 -translate-y-1/2 h-[2px]"></div>
        </div>

        <style>{`
          @keyframes truckMove {
            10%,30% { transform: translateX(-260px); }
            40% { transform: translateX(-165px); }
            60% { transform: translateX(-355px); }
            75%,100% { transform: translateX(24px); }
          }
          @keyframes boxMove {
            8%,10% { transform: translateX(64px); opacity: 1; }
            25% { transform: translateX(180px); opacity: 1; }
            26% { transform: translateX(180px); opacity: 0; }
            27%,100% { transform: translateX(0); opacity: 0; }
          }
          @keyframes linesMove {
            0%,30% { opacity: 0; transform: scaleY(.7) translateX(0); }
            35%,65% { opacity: 1; }
            70% { opacity: 0; }
            100% { transform: scaleY(.7) translateX(-640px); }
          }
          @keyframes roadIn {
            0%,6% { opacity: 0; }
            12%,72% { opacity: 1; }
            82%,100% { opacity: 0; }
          }
          @keyframes dashSlide {
            from { background-position-x: 0; }
            to { background-position-x: -60px; }
          }
          .order-btn .road { opacity: 0; }
          .order-btn .road-dashes {
            background: repeating-linear-gradient(90deg, rgba(255,255,255,.9) 0 14px, transparent 14px 30px);
          }
          @keyframes lightGlow {
            0%,8% { opacity: .35; box-shadow: none; }
            12%,70% { opacity: 1; box-shadow: 0 0 8px 3px rgba(253,224,71,.9); }
            80%,100% { opacity: .35; box-shadow: none; }
          }
          @keyframes beamOn {
            0%,8% { opacity: 0; }
            12%,70% { opacity: 1; }
            80%,100% { opacity: 0; }
          }
          .order-btn .light { opacity: .35; }
          .order-btn .beam { opacity: 0; }
          .order-btn.animate .default { opacity: 0; transition-delay: 0s; }
          .order-btn.animate .success { opacity: 1; transition-delay: ${successDelay}; }
          .order-btn.animate .truck { animation: truckMove var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .box { animation: boxMove var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .lines { animation: linesMove var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .light { animation: lightGlow var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .beam { animation: beamOn var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .road { animation: roadIn var(--order-btn-duration, ${duration}) ease forwards; }
          .order-btn.animate .road-dashes { animation: dashSlide .45s linear infinite; }
          @media (prefers-reduced-motion: reduce) {
            .order-btn.animate .truck,
            .order-btn.animate .box,
            .order-btn.animate .lines,
            .order-btn.animate .road { animation: none; opacity: 0; }
            .order-btn.animate .success { transition-delay: 0s; }
          }
        `}</style>
      </button>
    );
  }
);
OrderButton.displayName = "OrderButton";

export { orderButtonVariants };
export default OrderButton;

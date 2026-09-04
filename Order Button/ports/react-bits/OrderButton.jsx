"use client";

/**
 * Order Button — React Bits style variant (CSS Modules, no Tailwind needed
 * for the animation itself; theme colors come from the module + `variant`).
 *
 * Pair with `OrderButton.module.css`. Controlled: parent owns `isProcessing`.
 *
 * Usage:
 *   import OrderButton from "./OrderButton";
 *   <OrderButton
 *     onClick={handleClick}
 *     isProcessing={busy}
 *     defaultLabel="Confirm Order"
 *     successLabel="Order Placed"
 *   />
 */

import styles from "./OrderButton.module.css";

const SIZES = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
};

const VARIANTS = {
  dark: styles.variantDark,
  primary: styles.variantDark,
  red: styles.variantDark,
  amber: styles.variantAmber,
  accent: styles.variantAmber,
};

export default function OrderButton({
  onClick,
  isProcessing = false,
  disabled = false,
  defaultLabel = "Confirm Order",
  successLabel = "Order Placed",
  variant = "dark",
  size = "lg",
  durationMs = 6000,
  type = "button",
  className = "",
  style,
  ariaLabel,
  id,
  ref,
} = {}) {
  const isDisabled = disabled || isProcessing;
  const duration = `${durationMs}ms`;
  const successDelay = `${Math.round(durationMs * 0.7)}ms`;
  const fallbackLabel =
    typeof defaultLabel === "string" ? defaultLabel : "Place order";

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      aria-busy={isProcessing}
      aria-label={ariaLabel || fallbackLabel}
      style={{
        "--order-btn-duration": duration,
        "--order-btn-success-delay": successDelay,
        ...style,
      }}
      className={[
        styles.btn,
        SIZES[size] || SIZES.lg,
        VARIANTS[variant] || VARIANTS.dark,
        isDisabled ? styles.isDisabled : "",
        isProcessing ? styles.animate : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span aria-hidden={isProcessing} className={styles.defaultLabel}>
        {defaultLabel}
      </span>
      <span aria-live="polite" className={styles.successLabel}>
        {successLabel}
        <svg aria-hidden="true" viewBox="0 0 12 10" className={styles.check}>
          <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg>
      </span>

      <span aria-hidden="true" className={styles.box}></span>

      <span aria-hidden="true" className={styles.truck}>
        <span className={styles.truckBack}></span>
        <span className={styles.truckFront}>
          <span className={styles.truckWindow}></span>
        </span>
        <span className={`${styles.light} ${styles.lightTop}`}></span>
        <span className={`${styles.light} ${styles.lightBottom}`}></span>
        <span className={styles.beam}></span>
      </span>

      <span aria-hidden="true" className={styles.lines}></span>

      <span aria-hidden="true" className={styles.road}>
        <span className={styles.roadDashes}></span>
      </span>
    </button>
  );
}

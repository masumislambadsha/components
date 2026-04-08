"use client";

export default function GlowButton({
  children = "Get Started",
  onClick,
  dark = true,
}) {
  const chars = String(children).split("");

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative inline-flex shrink-0 cursor-pointer rounded-xl p-[3px]"
    >
      <div
        className={`glow-shadow ${dark ? "glow-shadow--dark" : "glow-shadow--light"}`}
      />

      <div
        className={`glow-border ${dark ? "glow-border--dark" : "glow-border--light"}`}
      />

      <span className="relative z-10 flex items-center justify-center rounded-[9px] bg-teal-600 px-5 py-3 text-[13.5px] font-semibold whitespace-nowrap text-white transition-colors duration-300 group-hover:bg-teal-700">
        <span className="text-swap-wrap" aria-hidden="true">
          <span className="text-swap-layer text-swap-layer--out">
            {chars.map((ch, i) => (
              <span
                key={`out-${i}`}
                className="text-swap-char-out"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>

          <span className="text-swap-layer text-swap-layer--in">
            {chars.map((ch, i) => (
              <span
                key={`in-${i}`}
                className="text-swap-char-in"
                style={{ transitionDelay: `${i * 0.03}s` }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </span>
        <span className="sr-only">{children}</span>
      </span>
    </button>
  );
}

// place in global.css
// /* shared text swap animation */
// .text-swap-wrap {
//   position: relative;
//   display: grid;
//   place-items: center;
//   overflow: hidden;
//   line-height: 1;
// }

// .text-swap-layer {
//   grid-area: 1 / 1;
//   display: inline-flex;
// }

// .text-swap-char-out,
// .text-swap-char-in {
//   display: inline-block;
//   transition: transform 0.3s ease;
//   will-change: transform;
// }

// .text-swap-char-in {
//   transform: translateY(1.2em);
// }

// .group:hover .text-swap-char-out {
//   transform: translateY(-1.2em);
// }

// .group:hover .text-swap-char-in {
//   transform: translateY(0);
// }

// /* glow button — conic-gradient + keyframe only */
// .glow-border,
// .glow-border--dark,
// .glow-border--light,
// .glow-shadow,
// .glow-shadow--dark,
// .glow-shadow--light {
//   position: absolute;
//   inset: 0;
//   border-radius: 12px;
//   overflow: hidden;
//   opacity: 0;
//   transition: opacity 0.3s;
// }

// .group:hover .glow-border,
// .group:hover .glow-border--dark,
// .group:hover .glow-border--light {
//   opacity: 1;
// }

// .group:hover .glow-shadow,
// .group:hover .glow-shadow--dark,
// .group:hover .glow-shadow--light {
//   opacity: 0.8;
// }

// .glow-shadow,
// .glow-shadow--dark,
// .glow-shadow--light {
//   filter: blur(10px);
//   z-index: 0;
// }

// .glow-border::before,
// .glow-border--dark::before,
// .glow-border--light::before,
// .glow-shadow::before,
// .glow-shadow--dark::before,
// .glow-shadow--light::before {
//   content: "";
//   position: absolute;
//   inset: -100%;
//   animation: glow-spin 5s linear infinite;
// }

// .glow-border--dark::before {
//   background: conic-gradient(
//     from 0deg,
//     transparent 0deg,
//     transparent 60deg,
//     #5eead4 80deg,
//     #ffffff 90deg,
//     #5eead4 100deg,
//     transparent 120deg,
//     transparent 240deg,
//     #5eead4 260deg,
//     #ffffff 270deg,
//     #5eead4 280deg,
//     transparent 300deg,
//     transparent 360deg
//   );
// }

// .glow-border--light::before {
//   background: conic-gradient(
//     from 0deg,
//     transparent 0deg,
//     transparent 60deg,
//     #0d9488 80deg,
//     #134e4a 90deg,
//     #0d9488 100deg,
//     transparent 120deg,
//     transparent 240deg,
//     #0d9488 260deg,
//     #134e4a 270deg,
//     #0d9488 280deg,
//     transparent 300deg,
//     transparent 360deg
//   );
// }

// .glow-shadow--dark::before {
//   background: conic-gradient(
//     from 0deg,
//     transparent 0deg,
//     transparent 60deg,
//     #0d9488 80deg,
//     #5eead4 90deg,
//     #0d9488 100deg,
//     transparent 120deg,
//     transparent 240deg,
//     #0d9488 260deg,
//     #5eead4 270deg,
//     #0d9488 280deg,
//     transparent 300deg,
//     transparent 360deg
//   );
// }

// .glow-shadow--light::before {
//   background: conic-gradient(
//     from 0deg,
//     transparent 0deg,
//     transparent 60deg,
//     #0f766e 80deg,
//     #0d9488 90deg,
//     #0f766e 100deg,
//     transparent 120deg,
//     transparent 240deg,
//     #0f766e 260deg,
//     #0d9488 270deg,
//     #0f766e 280deg,
//     transparent 300deg,
//     transparent 360deg
//   );
// }

// @keyframes glow-spin {
//   to {
//     transform: rotate(360deg);
//   }
// }

// @layer base {
//   * {
//     @apply border-border outline-ring/50;
//   }
//   body {
//     @apply bg-background text-foreground;
//     font-family: var(--font-fira-sans), sans-serif;
//   }
// }

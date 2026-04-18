"use client";

import { startTransition, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Factory,
  Image,
  Layers3,
  MonitorSmartphone,
  Package,
  PencilRuler,
  Search,
  TrendingUp,
  Truck,
} from "lucide-react";

const services = [
  {
    id: "product-development",
    title: "Product Development",
    subtitle: "From concept direction to production-ready specs.",
    description:
      "We refine sketches, samples, trims, and construction details until your product is clear enough for confident factory execution.",
    bullets: ["Concept alignment", "Sampling rounds", "Tech-pack clarity"],
    bestFit: "Brands shaping a new line or upgrading an existing bestseller.",
    outcome: "A cleaner handoff between design, sourcing, and production.",
    accent: "#58f0c7",
    border: "rgba(88, 240, 199, 0.34)",
    shadow: "rgba(18, 102, 84, 0.45)",
    panel: "#0f2521",
    overlay:
      "radial-gradient(circle at top right, rgba(88,240,199,0.34), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 42%)",
    icon: PencilRuler,
  },
  {
    id: "product-sourcing",
    title: "Product Sourcing",
    subtitle: "Match the right supplier to the right margin target.",
    description:
      "We source dependable factories, compare capabilities, and balance quality, lead time, and cost so you are not buying blind.",
    bullets: ["Factory matching", "Cost comparison", "Risk screening"],
    bestFit: "Teams entering new categories or replacing unreliable vendors.",
    outcome:
      "A faster path to qualified supply partners and sharper buying decisions.",
    accent: "#4cc9ff",
    border: "rgba(76, 201, 255, 0.34)",
    shadow: "rgba(25, 92, 121, 0.42)",
    panel: "#102331",
    overlay:
      "radial-gradient(circle at top right, rgba(76,201,255,0.32), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 44%)",
    icon: Search,
  },
  {
    id: "shipping-logistics",
    title: "Shipping & Logistics",
    subtitle:
      "Keep goods moving with fewer surprises between factory and shelf.",
    description:
      "We coordinate shipment planning, timelines, and documentation so production progress translates into reliable delivery windows.",
    bullets: ["Shipment planning", "Timeline visibility", "Document support"],
    bestFit:
      "Importers who need tighter control over landed timing and coordination.",
    outcome: "A steadier flow from finished goods to final destination.",
    accent: "#ffb86a",
    border: "rgba(255, 184, 106, 0.34)",
    shadow: "rgba(122, 72, 25, 0.42)",
    panel: "#2b1e13",
    overlay:
      "radial-gradient(circle at top right, rgba(255,184,106,0.32), transparent 36%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 44%)",
    icon: Truck,
  },
  {
    id: "dropshipping",
    title: "Dropshipping",
    subtitle: "Launch product without carrying unnecessary inventory risk.",
    description:
      "We help structure supplier coordination, order flow, and fulfillment readiness for brands that want to move quickly with leaner stock positions.",
    bullets: ["Supplier sync", "Order routing", "Fulfillment readiness"],
    bestFit:
      "Growing ecommerce operators testing demand without deep inventory buys.",
    outcome:
      "A leaner operating model that stays responsive during early scale.",
    accent: "#ff7ac8",
    border: "rgba(255, 122, 200, 0.34)",
    shadow: "rgba(116, 33, 79, 0.4)",
    panel: "#2a1624",
    overlay:
      "radial-gradient(circle at top right, rgba(255,122,200,0.34), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 44%)",
    icon: Package,
  },
  {
    id: "ecommerce",
    title: "Ecommerce",
    subtitle:
      "Build the operational backbone behind product-led online growth.",
    description:
      "We support the sourcing side of ecommerce with catalog planning, vendor readiness, and fulfillment thinking built for fast-moving digital sales cycles.",
    bullets: ["Catalog planning", "Channel readiness", "Fulfillment thinking"],
    bestFit: "Digital-first brands that need sourcing to move at online speed.",
    outcome:
      "Merchandise flow that supports launches, replenishment, and scale.",
    accent: "#8da2ff",
    border: "rgba(141, 162, 255, 0.34)",
    shadow: "rgba(45, 56, 120, 0.44)",
    panel: "#1a1d33",
    overlay:
      "radial-gradient(circle at top right, rgba(141,162,255,0.32), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.12), transparent 44%)",
    icon: MonitorSmartphone,
  },
  {
    id: "business-counseling",
    title: "Business Counseling",
    subtitle: "Translate sourcing complexity into clearer strategic decisions.",
    description:
      "We advise on supplier structure, margin protection, category rollout, and operating decisions that help brands grow without losing control of execution.",
    bullets: ["Supplier strategy", "Margin planning", "Growth guidance"],
    bestFit:
      "Founders and operators scaling sourcing decisions beyond ad hoc buying.",
    outcome:
      "Sharper commercial judgment backed by market-facing production insight.",
    accent: "#d8ff77",
    border: "rgba(216, 255, 119, 0.34)",
    shadow: "rgba(96, 120, 34, 0.38)",
    panel: "#272e16",
    overlay:
      "radial-gradient(circle at top right, rgba(216,255,119,0.3), transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 44%)",
    icon: TrendingUp,
  },
  {
    id: "multimedia",
    title: "Multimedia",
    subtitle: "Support the product story with visuals that sell more clearly.",
    description:
      "We help shape imagery and creative support assets that make launches, presentations, and buyer communication feel more polished and persuasive.",
    bullets: [
      "Campaign visuals",
      "Launch support",
      "Sales presentation assets",
    ],
    bestFit:
      "Teams that need production and presentation to move in the same rhythm.",
    outcome:
      "A stronger market-facing story around the products you are building.",
    accent: "#ffd86d",
    border: "rgba(255, 216, 109, 0.34)",
    shadow: "rgba(120, 88, 30, 0.4)",
    panel: "#302512",
    overlay:
      "radial-gradient(circle at top right, rgba(255,216,109,0.32), transparent 35%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 44%)",
    icon: Image,
  },
  {
    id: "odm",
    title: "ODM",
    subtitle:
      "Move faster with supplier-led development built around your market.",
    description:
      "We help evaluate and adapt existing manufacturer capabilities so you can launch with less development drag while keeping the offer aligned to your brand.",
    bullets: ["Supplier-led options", "Range adaptation", "Speed-to-market"],
    bestFit:
      "Brands that want a faster route to launch without starting from zero.",
    outcome: "Quicker commercialization with better-fit factory capabilities.",
    accent: "#63f5ef",
    border: "rgba(99, 245, 239, 0.34)",
    shadow: "rgba(20, 112, 108, 0.42)",
    panel: "#112b2b",
    overlay:
      "radial-gradient(circle at top right, rgba(99,245,239,0.3), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 44%)",
    icon: Layers3,
  },
  {
    id: "oem",
    title: "OEM",
    subtitle:
      "Build to spec with tighter control over manufacturing execution.",
    description:
      "We coordinate factory capability, production expectations, and execution standards for brands that need custom output at repeatable quality.",
    bullets: [
      "Custom manufacturing",
      "Execution control",
      "Quality consistency",
    ],
    bestFit:
      "Businesses that need dependable manufacturing around defined product specs.",
    outcome:
      "A more disciplined production path from approved design to repeat orders.",
    accent: "#ff8f83",
    border: "rgba(255, 143, 131, 0.34)",
    shadow: "rgba(132, 53, 43, 0.42)",
    panel: "#311815",
    overlay:
      "radial-gradient(circle at top right, rgba(255,143,131,0.34), transparent 34%), radial-gradient(circle at bottom left, rgba(255,255,255,0.1), transparent 44%)",
    icon: Factory,
  },
];

const panelTransition = {
  duration: 0.72,
  ease: [0.22, 1, 0.36, 1],
};

function formatIndex(value) {
  return String(value).padStart(2, "0");
}

function wrapIndex(index) {
  const total = services.length;
  return (index + total) % total;
}

export default function InteractiveServices() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animationDirection, setAnimationDirection] = useState("top");
  const reduceMotion = useReducedMotion();
  const activeService = services[activeIndex];
  const ActiveIcon = activeService.icon;
  const travelDistance = reduceMotion ? 0 : 56;
  const hasOddServiceCount = services.length % 2 === 1;

  const contentVariants = {
    enter: (direction) => {
      if (direction === "right") {
        return { x: travelDistance, y: 0, opacity: 0 };
      }

      if (direction === "left") {
        return { x: -travelDistance, y: 0, opacity: 0 };
      }

      return { x: 0, y: -travelDistance, opacity: 0 };
    },
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration: reduceMotion ? 0.18 : 0.58,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    exit: (direction) => {
      if (direction === "right") {
        return { x: -travelDistance, y: 0, opacity: 0 };
      }

      if (direction === "left") {
        return { x: travelDistance, y: 0, opacity: 0 };
      }

      return { x: 0, y: travelDistance, opacity: 0 };
    },
  };

  const setService = (nextIndex, direction) => {
    if (nextIndex === activeIndex) {
      return;
    }

    setAnimationDirection(direction);
    startTransition(() => setActiveIndex(nextIndex));
  };

  const goToPrevious = () => {
    setService(wrapIndex(activeIndex - 1), "left");
  };

  const goToNext = () => {
    setService(wrapIndex(activeIndex + 1), "right");
  };

  return (
    <section className="relative bg-[#020606] py-24 text-white sm:py-28">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(13,148,136,0.14),transparent_34%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.05),transparent_28%)]" />

      <div className="relative mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-8 lg:px-10">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.26em] text-teal-300 backdrop-blur-sm">
            Interactive Services
          </span>
          <h2 className="mt-6 max-w-4xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.35rem] lg:leading-[1.02]">
            Explore the nine service lanes that keep product, sourcing, and
            delivery moving as one system.
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Pick a lane from the grid or move side to side with the controls.
            The detail board responds directionally, so each transition feels
            spatial instead of abrupt.
          </p>
        </div>

        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr] xl:items-start">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm sm:p-6">
            <div className="mb-5 flex items-end justify-between gap-4 border-b border-white/8 pb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/42">
                  Service Grid
                </p>
                <p className="mt-2 text-sm text-slate-300">
                  Pick your INTEREST
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {services.map((service, index) => {
                const Icon = service.icon;
                const isActive = index === activeIndex;
                const shouldSpanFull =
                  hasOddServiceCount && index === services.length - 1;

                return (
                  <motion.button
                    key={service.id}
                    type="button"
                    onClick={() => setService(index, "top")}
                    className={`relative flex min-h-[164px] flex-col justify-between overflow-hidden rounded-[24px] border p-4 text-left transition-colors duration-500 ${
                      isActive
                        ? "text-white"
                        : "border-white/8 bg-black/20 text-slate-300 hover:border-white/16 hover:bg-white/[0.04] hover:text-white"
                    } ${shouldSpanFull ? "sm:col-span-2" : ""}`}
                    style={
                      isActive
                        ? {
                            backgroundColor: service.panel,
                            borderColor: service.border,
                            boxShadow: `0 22px 60px ${service.shadow}`,
                          }
                        : undefined
                    }
                    whileHover={reduceMotion ? undefined : { y: -3 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.985 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    aria-pressed={isActive}
                  >
                    <div
                      className="absolute inset-0 opacity-90"
                      style={{
                        background: isActive ? service.overlay : "none",
                      }}
                    />

                    <div className="relative flex items-start justify-between gap-4">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/52">
                        {formatIndex(index + 1)}
                      </span>
                      <span
                        className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border bg-black/15 backdrop-blur-sm"
                        style={{
                          borderColor: isActive
                            ? service.border
                            : "rgba(255,255,255,0.12)",
                          color: isActive ? service.accent : "#ffffff",
                        }}
                      >
                        <Icon size={20} />
                      </span>
                    </div>

                    <div className="relative">
                      <h3 className="max-w-xs text-lg font-semibold tracking-[-0.03em]">
                        {service.title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-slate-300/90">
                        {service.subtitle}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          <motion.div
            className="relative overflow-hidden rounded-[32px] border p-6 sm:p-8 lg:p-10 xl:sticky xl:top-28 xl:self-start"
            animate={{
              backgroundColor: activeService.panel,
              borderColor: activeService.border,
              boxShadow: `0 28px 100px ${activeService.shadow}`,
            }}
            transition={panelTransition}
          >
             <div
              className="absolute inset-0 opacity-95"
              style={{ background: activeService.overlay }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_30%,rgba(255,255,255,0.02))]" />

            <div className="relative flex h-full flex-col justify-between gap-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-black/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/72">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: activeService.accent }}
                  />
                  Selected Service
                </div>
              </div>

              <div className="relative flex-1" aria-live="polite">
                <AnimatePresence
                  mode="wait"
                  initial={false}
                  custom={animationDirection}
                >
                  <motion.div
                    key={activeService.id}
                    custom={animationDirection}
                    variants={contentVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="flex h-full flex-col"
                  >
                    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                      <div className="max-w-2xl">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/52">
                          {activeService.subtitle}
                        </p>
                        <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white sm:text-[2.45rem] sm:leading-[1.02]">
                          {activeService.title}
                        </h3>
                        <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-200/88 sm:text-base">
                          {activeService.description}
                        </p>
                      </div>

                      <div
                        className="inline-flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center rounded-[26px] border bg-black/16 text-white backdrop-blur-sm sm:h-20 sm:w-20"
                        style={{
                          borderColor: activeService.border,
                          color: activeService.accent,
                        }}
                      >
                        <ActiveIcon size={34} strokeWidth={1.7} />
                      </div>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      {activeService.bullets.map((bullet) => (
                        <span
                          key={bullet}
                          className="inline-flex rounded-full border border-white/12 bg-black/16 px-4 py-2 text-xs font-medium text-white/88 backdrop-blur-sm"
                        >
                          {bullet}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8 grid gap-4 lg:grid-cols-[1.18fr_0.82fr]">
                      <div className="rounded-[26px] border border-white/10 bg-black/14 p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                          Best Fit
                        </p>
                        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-200/88">
                          {activeService.bestFit}
                        </p>
                      </div>

                      <div className="rounded-[26px] border border-white/10 bg-black/14 p-5 backdrop-blur-sm">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                          Outcome
                        </p>
                        <p className="mt-4 text-sm leading-7 text-slate-200/88">
                          {activeService.outcome}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
                      <a
                        href="mailto:info@1and9apparel.com"
                        className="inline-flex items-center gap-3 text-sm font-semibold text-white transition-colors duration-300 hover:text-slate-200"
                      >
                        Start a sourcing conversation
                        <ArrowRight size={16} />
                      </a>

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={goToPrevious}
                          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-black/18 px-3 py-[9px] text-sm font-medium text-white transition-colors duration-300 hover:border-white/22 hover:bg-black/28"
                        >
                          <ChevronLeft size={16} />
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={goToNext}
                          className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white text-sm font-semibold text-slate-950 transition-colors duration-300 hover:bg-slate-100 px-3 py-2"
                        >
                          Next
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div> 
          </motion.div>
        </div>
      </div>
    </section>
  );
}

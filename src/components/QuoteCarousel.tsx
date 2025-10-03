import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Target, TargetAndTransition, Transition } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Quote } from "@/utils/manifestoContent";
import { useMotionPreferences, easeCosmic } from "@/utils/animations";

type TransitionMode = "fade" | "slide" | "fragment";

type VariantResolver = TargetAndTransition | ((direction: number) => TargetAndTransition);

type VariantConfig = {
  initial: VariantResolver;
  animate: Target;
  exit: VariantResolver;
  transitions?: {
    enter?: Transition;
    exit?: Transition;
  };
};

const transitionVariants: Record<TransitionMode, VariantConfig> = {
  fade: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -12 },
  },
  slide: {
    initial: (direction: number) => ({ opacity: 0, x: direction > 0 ? 80 : -80 }),
    animate: { opacity: 1, x: 0 },
    exit: (direction: number) => ({ opacity: 0, x: direction > 0 ? -80 : 80 }),
  },
  fragment: {
    initial: { opacity: 0, clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" },
    animate: { opacity: 1, clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" },
    exit: { opacity: 0, clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)" },
    transitions: {
      enter: { duration: 0.9, ease: easeCosmic },
      exit: { duration: 0.4, ease: easeCosmic },
    },
  },
};

type QuoteCarouselVariant = "hero" | "section" | "sidebar";

type QuoteCarouselProps = {
  quotes: Quote[];
  autoPlay?: boolean;
  interval?: number;
  pauseOnHover?: boolean;
  transitionMode?: TransitionMode;
  variant?: QuoteCarouselVariant;
  showControls?: boolean;
  onQuoteChange?: (index: number, quote: Quote) => void;
  className?: string;
};

const variantStyles: Record<QuoteCarouselVariant, string> = {
  hero: "max-w-5xl mx-auto text-center",
  section: "max-w-3xl text-center",
  sidebar: "max-w-md text-left",
};

const quoteTypography: Record<QuoteCarouselVariant, string> = {
  hero: "text-2xl md:text-3xl lg:text-4xl font-elegant tracking-tight leading-[1.4]",
  section: "text-xl md:text-2xl font-elegant leading-relaxed",
  sidebar: "text-lg font-elegant leading-relaxed",
};

const attributionTypography: Record<QuoteCarouselVariant, string> = {
  hero: "text-lg md:text-xl font-medium text-accent mt-6",
  section: "text-base md:text-lg text-primary mt-4",
  sidebar: "text-base text-muted-foreground/80 mt-3",
};

export const QuoteCarousel = React.forwardRef<HTMLDivElement, QuoteCarouselProps>(
  (
    {
      quotes,
      autoPlay = true,
      interval = 9000,
      pauseOnHover = true,
      transitionMode = "fade",
      variant = "hero",
      showControls = true,
      onQuoteChange,
      className,
      ...rest
    },
    forwardedRef,
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(forwardedRef, () => containerRef.current);

    const { prefersReducedMotion } = useMotionPreferences();

    const [index, setIndex] = React.useState(0);
    const [direction, setDirection] = React.useState(1);
    const [isHovered, setIsHovered] = React.useState(false);

    const safeQuotes = React.useMemo(
      () => (quotes.length ? quotes : [{ text: "Content stirring the inevitable is on its way." }]),
      [quotes],
    );

    const goto = React.useCallback(
      (next: number, nextDirection: number) => {
        setIndex((prev) => {
          const nextIndex = (next + safeQuotes.length) % safeQuotes.length;
          if (onQuoteChange) onQuoteChange(nextIndex, safeQuotes[nextIndex]);
          return nextIndex;
        });
        setDirection(nextDirection);
      },
      [onQuoteChange, safeQuotes],
    );

    const handleNext = React.useCallback(() => goto(index + 1, 1), [goto, index]);
    const handlePrev = React.useCallback(() => goto(index - 1, -1), [goto, index]);

    React.useEffect(() => {
      if (!autoPlay || prefersReducedMotion) return;
      if (pauseOnHover && isHovered) return;

      const id = window.setInterval(() => {
        goto(index + 1, 1);
      }, interval);

      return () => window.clearInterval(id);
    }, [autoPlay, pauseOnHover, isHovered, interval, goto, index, prefersReducedMotion]);

    React.useEffect(() => {
      if (!pauseOnHover) return;
      const node = containerRef.current;
      if (!node) return;

      const handleEnter = () => setIsHovered(true);
      const handleLeave = () => setIsHovered(false);

      node.addEventListener("pointerenter", handleEnter, { passive: true });
      node.addEventListener("pointerleave", handleLeave, { passive: true });

      return () => {
        node.removeEventListener("pointerenter", handleEnter);
        node.removeEventListener("pointerleave", handleLeave);
      };
    }, [pauseOnHover]);

    const currentQuote = safeQuotes[index % safeQuotes.length];

    const modes: TransitionMode[] = prefersReducedMotion ? ["fade"] : [transitionMode];
    const currentMode = modes[0] ?? "fade";
    const variantClass = variantStyles[variant];

    const config = transitionVariants[currentMode];
    const resolveVariant = React.useCallback(
      (value: VariantResolver, dir: number): TargetAndTransition =>
        (typeof value === "function" ? value(dir) : value),
      [],
    );
    const stripTransition = React.useCallback((variant: TargetAndTransition): Target => {
      const { transition: _transition, ...target } = variant;
      return target as Target;
    }, []);

    const initialVariant = stripTransition(resolveVariant(config.initial, direction));
    const exitVariant = resolveVariant(config.exit, direction);
    const enterTransition: Transition = config.transitions?.enter ?? { duration: 0.75, ease: easeCosmic };
    const exitTransition: Transition = config.transitions?.exit ?? { duration: 0.45, ease: easeCosmic };
    const exitTarget: TargetAndTransition = { ...exitVariant, transition: exitTransition };

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) (forwardedRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={cn(
          "relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-8 md:p-12 shadow-[0_0_60px_rgba(255,255,255,0.08)]",
          "before:absolute before:inset-[-30%] before:bg-gradient-to-br before:from-white/10 before:via-transparent before:to-transparent before:blur-3xl before:content-['']",
          variantClass,
          className,
        )}
        {...rest}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-10 top-10 h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 via-secondary/10 to-transparent blur-3xl" />
          <div className="absolute left-16 bottom-14 h-32 w-32 rounded-full bg-gradient-to-br from-accent/15 via-primary/10 to-transparent blur-3xl" />
        </div>

        <AnimatePresence custom={direction} mode="wait">
          <motion.blockquote
            key={index}
            custom={direction}
            initial={initialVariant}
            animate={config.animate}
            transition={enterTransition}
            exit={exitTarget}
            className={cn("relative z-10", quoteTypography[variant])}
          >
            <span className="mb-6 inline-block align-middle text-6xl text-accent/70">“</span>
            <motion.span
              className="inline-block align-middle text-balance"
              layout
              transition={{ duration: 0.6, ease: easeCosmic }}
            >
              {currentQuote.text}
            </motion.span>
            <span className="ml-1 inline-block align-middle text-5xl text-accent/70">”</span>

            {currentQuote.attribution ? (
              <motion.footer
                layout
                className={cn(
                  "relative z-10",
                  "after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-gradient-to-b after:from-primary/40 after:to-transparent after:content-['']",
                  attributionTypography[variant],
                )}
              >
                <span className="ml-4 block font-semibold uppercase tracking-[0.35em] text-xs text-muted-foreground/70">
                  {currentQuote.context ?? "Manifesto"}
                </span>
                <span className="ml-4 block text-balance">{currentQuote.attribution}</span>
              </motion.footer>
            ) : null}
          </motion.blockquote>
        </AnimatePresence>

        {showControls && safeQuotes.length > 1 ? (
          <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-6 md:bottom-8">
            <button
              type="button"
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md transition hover:border-primary/50 hover:text-primary"
              aria-label="Previous quote"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-2">
              {safeQuotes.map((quoteItem, dotIndex) => {
                const dotKey = `${quoteItem.text ?? quoteItem.attribution ?? JSON.stringify(quoteItem)}`;
                return (
                <span
                    key={dotKey}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full bg-white/20 transition-all",
                    dotIndex === index % safeQuotes.length && "w-8 bg-primary",
                  )}
                />
                );
              })}
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white/80 backdrop-blur-md transition hover:border-primary/50 hover:text-primary"
              aria-label="Next quote"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>
    );
  },
);

QuoteCarousel.displayName = "QuoteCarousel";

export default QuoteCarousel;

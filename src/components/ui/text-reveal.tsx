import * as React from "react";
import { motion, useInView } from "framer-motion";

import { cn } from "@/lib/utils";
import { useMotionPreferences } from "@/utils/animations";

type RenderComponent = React.ElementType;

type TextRevealProps = {
  /** Text content to animate. If omitted, string children will be used instead. */
  text?: string;
  /** Optional React children; if string, they become the animated text. */
  children?: React.ReactNode;
  /** Wrapper component for the animated text. */
  as?: RenderComponent;
  /** Tailwind/className to apply to the wrapper. */
  className?: string;
  /** Delay before the animation starts. */
  delay?: number;
  /** Stagger duration between each word reveal. */
  stagger?: number;
  /** Whether to run the animation only once when entering the viewport. */
  once?: boolean;
  /** Extra class applied to words when they become visible. */
  wordClassName?: string;
} & React.HTMLAttributes<HTMLElement>;

const defaultVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
  },
  visible: {
    y: "0%",
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.33, 1, 0.68, 1],
    },
  },
};

export const TextReveal = React.forwardRef<HTMLElement, TextRevealProps>(
  (
    {
      text,
      children,
      as: Component = "span",
      className,
      delay = 0,
      stagger = 0.08,
      once = true,
      wordClassName,
      ...rest
    },
    forwardedRef,
  ) => {
    const fallbackText = React.useMemo(() => {
      if (typeof text === "string") return text;
      if (typeof children === "string") return children;
      return "";
    }, [text, children]);

    const content = React.useMemo(() => fallbackText.trim(), [fallbackText]);

    const words = React.useMemo(() => content.split(/\s+/).filter(Boolean), [content]);

    const containerRef = React.useRef<HTMLElement | null>(null);

    React.useImperativeHandle(forwardedRef, () => containerRef.current);

    const assignRefs = React.useCallback(
      (node: HTMLElement | null) => {
        containerRef.current = node;
        if (typeof forwardedRef === "function") {
          forwardedRef(node);
        } else if (forwardedRef) {
          (forwardedRef as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [forwardedRef],
    );

    const isInView = useInView(containerRef, {
      once,
      amount: 0.3,
      margin: "0px 0px -10% 0px",
    });

    const { prefersReducedMotion } = useMotionPreferences();

    if (!content) {
      return (
        <Component ref={assignRefs} className={className} {...rest}>
          {children}
        </Component>
      );
    }

    if (prefersReducedMotion) {
      return (
        <Component ref={assignRefs} className={className} {...rest}>
          {content}
        </Component>
      );
    }

    return (
      <Component ref={assignRefs} className={cn("inline-block overflow-hidden", className)} {...rest}>
        <span className="flex flex-wrap gap-x-2 gap-y-3">
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={defaultVariants}
              transition={{
                delay: delay + index * stagger,
              }}
              className={cn("inline-block translate-y-full", wordClassName)}
            >
              <span className="inline-block">{word}</span>
            </motion.span>
          ))}
        </span>
      </Component>
    );
  },
);

TextReveal.displayName = "TextReveal";

export default TextReveal;

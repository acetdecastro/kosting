"use client";

import { motion } from "framer-motion";
import { cn } from "@lib/utils";
import { ThemeSwitcher } from "./theme-switcher";
import Link from "next/link";
import { ROUTES } from "@src/constants";
import LandingBrand from "@src/components/landing-brand";

export type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-primary/[0.08]",
}: ElegantShapeProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px]",
            "shadow-[0_2px_8px_0_rgba(255,255,255,0.1)]",
            "after:absolute after:inset-0 after:rounded-full",
            "after:bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.2),transparent_70%)]",
          )}
        />
      </motion.div>
    </motion.div>
  );
}

export type HeroGeometricProps = {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  className?: string;
};

export default function HeroGeometric({
  title1 = "Smart Costing Made Simple",
  title2 = "Built for entrepreneurs & makers",
  description = "Track product costs, set optimal prices, and monitor profitability. All in one place. Perfect for food sellers and makers.",
  className,
}: HeroGeometricProps) {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };
  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden",
        className,
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-teal-300/20 to-rose-300/20" />
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-teal-500/[0.15]"
          className="top-[15%] left-[-10%] md:top-[20%] md:left-[-5%]"
        />
        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-rose-500/[0.15]"
          className="top-[70%] right-[-5%] md:top-[75%] md:right-[0%]"
        />
        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-violet-500/[0.15]"
          className="bottom-[5%] left-[5%] md:bottom-[10%] md:left-[10%]"
        />
        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-amber-500/[0.15]"
          className="top-[10%] right-[15%] md:top-[15%] md:right-[20%]"
        />
        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-500/[0.15]"
          className="top-[5%] left-[20%] md:top-[10%] md:left-[25%]"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="bg-secondary/90 shadow-primary/50 mb-8 inline-flex w-full max-w-fit items-center justify-between gap-2 rounded-3xl px-3 py-2 shadow sm:gap-4 sm:px-4 sm:py-2 md:mb-12 md:gap-6 md:px-6"
          >
            <LandingBrand />

            {/* Navigation Links Container */}
            <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
              {/* Sign In Link */}
              <Link
                href={ROUTES.auth.signIn}
                className="hover:text-muted-foreground text-xs whitespace-nowrap transition-all duration-200 sm:text-sm md:text-base"
              >
                Sign In
              </Link>

              {/* Sign Up Link */}
              <Link
                href={ROUTES.auth.signUp}
                className="hover:text-muted-foreground text-xs whitespace-nowrap underline decoration-teal-500/80 decoration-wavy underline-offset-6 transition-all duration-200 hover:decoration-teal-300/50 sm:text-sm md:text-base"
              >
                <span>Sign Up</span>
              </Link>

              {/* Theme Switcher */}
              <div className="shrink-0">
                <ThemeSwitcher />
              </div>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="w-auto"
          >
            <h1 className="mb-6 text-2xl font-bold sm:text-5xl md:mb-8 md:text-8xl">
              <span className="from-primary/80 to-primary bg-gradient-to-b bg-clip-text text-transparent">
                {title1}
              </span>
              <br />
              <span
                className={cn(
                  "from-primary to-primary/80 bg-gradient-to-b bg-clip-text text-transparent",
                )}
              >
                {title2}
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <p className="text-primary/60 mx-auto mb-8 max-w-xl px-4 text-xs font-normal sm:text-base md:text-2xl">
              {description}
            </p>
          </motion.div>
        </div>
      </div>
      {/* <div className="from-accent/10 to-primary/20 pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent blur-2xl" /> */}
      {/* <div className="from-accent to-primary pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent" /> */}
    </div>
  );
}

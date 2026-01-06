import React, { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    children?: React.ReactNode;
}

export default function SideNote({ children }: Props) {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Desktop: Popover */}
            <span className="hidden md:inline-flex align-top">
                <Popover.Root>
                    <Popover.Trigger asChild>
                        <button
                            className="text-link text-sm -top-[0.4em] relative font-bold hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                            aria-label="Show side note"
                        >
                            (＋)
                        </button>
                    </Popover.Trigger>
                    <Popover.Portal>
                        <Popover.Content
                            className="z-50 w-72 bg-surface border border-stone-200 dark:border-stone-800 rounded-lg shadow-lg p-4 text-base text-primary leading-relaxed animate-in fade-in zoom-in-95 duration-200"
                            sideOffset={5}
                            side="right"
                            align="start"
                        >
                            {children}
                            <Popover.Arrow className="fill-background stroke-stone-200 dark:stroke-stone-800" />
                        </Popover.Content>
                    </Popover.Portal>
                </Popover.Root>
            </span>

            {/* Mobile: Inline Toggle (Tufte-style) */}
            <span className="md:hidden">
                <button
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                    className="text-link text-sm -top-[0.4em] relative font-bold px-0.5 active:bg-link/10 rounded cursor-pointer"
                    aria-label="Toggle side note"
                    aria-expanded={isMobileOpen}
                >
                    (＋)
                </button>
                <AnimatePresence>
                    {isMobileOpen && (
                        <motion.span
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="block my-2 pl-3 border-l-2 border-link text-base text-primary/80 italic overflow-hidden"
                        >
                            {children}
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </>
    );
}

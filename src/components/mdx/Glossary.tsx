import React from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import glossaryData from "../../content/glossary.json";

interface Props {
    term: string;
    children?: React.ReactNode;
}

export default function Glossary({ term, children }: Props) {
    // @ts-ignore
    const definition = glossaryData[term.toLowerCase()]?.definition;

    if (!definition) {
        // Fallback if term not found, just render text without tooltip
        return <span className="text-secondary decoration-dotted underline decoration-secondary/50">{children || term}</span>;
    }

    return (
        <Tooltip.Provider delayDuration={300}>
            <Tooltip.Root>
                <Tooltip.Trigger asChild>
                    <span
                        className="text-primary decoration-link decoration-[3px] underline decoration-dotted underline-offset-4 cursor-help hover:text-primary/80 transition-colors"
                        tabIndex={0}
                    >
                        {children || term}
                    </span>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                    <Tooltip.Content
                        className="z-50 max-w-xs bg-surface text-primary px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 shadow-xl animate-in fade-in zoom-in-95 duration-200"
                        sideOffset={8}
                    >
                        {definition}
                    </Tooltip.Content>
                </Tooltip.Portal>
            </Tooltip.Root>
        </Tooltip.Provider>
    );
}

import React from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
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
        <HoverCard.Root openDelay={100} closeDelay={200}>
            <HoverCard.Trigger asChild>
                <span
                    className="text-primary decoration-link decoration-[3px] underline decoration-dotted underline-offset-4 cursor-help hover:text-primary/80 transition-colors"
                    tabIndex={0}
                >
                    {children || term}
                </span>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="z-50 max-w-xs bg-surface text-primary px-3 py-2 rounded-lg border border-stone-200 dark:border-stone-800 shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 duration-150"
                    sideOffset={8}
                    collisionPadding={8}
                >
                    {definition}
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}


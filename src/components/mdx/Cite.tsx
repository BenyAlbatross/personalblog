import React, { useMemo } from "react";
import * as HoverCard from "@radix-ui/react-hover-card";
import { toJSON } from "bibtex-parser-js";
import referencesRaw from "../../content/references.bib?raw";


interface Props {
    id: string;
    index?: number;
}

export default function Cite({ id, index: propIndex }: Props) {
    // Parse bibtex once (or memoized). In production, this should ideally be done at build time,
    // but for a small blog, client-side parsing of a small bib file is acceptable/fast.
    // We use useMemo to avoid re-parsing on every render.
    const references = useMemo(() => {
        // @ts-ignore - bibtex-parser-js types might be missing or loose
        const parsed = toJSON(referencesRaw);
        if (Array.isArray(parsed)) {
            const map = parsed.reduce((acc: any, item: any) => {
                const entryTagsLower = Object.keys(item.entryTags).reduce((tags: any, key: string) => {
                    tags[key.toLowerCase()] = item.entryTags[key];
                    return tags;
                }, {});
                acc[item.citationKey.toUpperCase()] = entryTagsLower;
                return acc;
            }, {});
            return map;
        }
        return parsed;
    }, []);

    const entry = references[id.toUpperCase()];

    if (!entry) {
        return <span className="text-red-500">[{id}?]</span>;
    }

    // Use property index if available (from remark plugin), otherwise calculate based on alphabetical order
    const propsIdUpper = id.toUpperCase();
    const index = propIndex || Object.keys(references).sort().indexOf(propsIdUpper) + 1;


    // Helper to format authors from standard BibTeX "Last, First and Last, First..."
    const formatAuthors = (authorStr: string) => {
        if (!authorStr) return "";
        return authorStr.split(" and ").map(name => {
            const parts = name.split(",");
            if (parts.length === 2) {
                return `${parts[1].trim()} ${parts[0].trim()}`;
            }
            return name;
        }).join(", ");
    };

    // Helper to decode common LaTeX characters in BibTeX
    const decodeTex = (str: string) => {
        if (!str) return "";
        return str
            .replace(/{\\L}/g, "Ł")
            .replace(/{\\l}/g, "ł")
            .replace(/{\\'e}/g, "é")
            .replace(/{\\`e}/g, "è")
            .replace(/{\\"o}/g, "ö")
            .replace(/{\\"u}/g, "ü")
            .replace(/[{}]/g, ""); // Remove remaining braces
    };

    return (
        <HoverCard.Root openDelay={200} closeDelay={300}>
            <HoverCard.Trigger asChild>
                <span
                    className="text-link cursor-pointer select-none font-normal hover:bg-link/10 rounded px-0.5"
                    role="button"
                    tabIndex={0}
                >
                    [{index}]
                </span>
            </HoverCard.Trigger>
            <HoverCard.Portal>
                <HoverCard.Content
                    className="z-50 w-80 bg-surface border border-stone-200 dark:border-stone-800 rounded-lg shadow-lg p-5 animate-in fade-in zoom-in-95 duration-200"
                    sideOffset={5}
                >
                    <div className="flex flex-col gap-1.5 font-sans">
                        <h4 className="font-bold text-primary text-base leading-snug">
                            {decodeTex(entry.title)}
                        </h4>
                        <div className="text-sm text-primary/80 italic leading-relaxed">
                            {decodeTex(formatAuthors(entry.author))}
                        </div>
                        <div className="text-sm text-primary/60 leading-relaxed">
                            {entry.journal && <span>{decodeTex(entry.journal)}, </span>}
                            {entry.publisher && <span>{decodeTex(entry.publisher)}, </span>}
                            <span>{entry.year}</span>
                        </div>
                        {entry.doi && (
                            <a
                                href={`https://doi.org/${entry.doi}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-link underline mt-1 block hover:text-link/80"
                            >
                                https://doi.org/{entry.doi}
                            </a>
                        )}
                        <HoverCard.Arrow className="fill-background stroke-stone-200 dark:stroke-stone-800" />
                    </div>
                </HoverCard.Content>
            </HoverCard.Portal>
        </HoverCard.Root>
    );
}

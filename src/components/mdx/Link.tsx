import React from "react";
import clsx from "clsx";

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    external?: boolean;
}

export default function Link({ href, children, className, external, ...props }: Props) {
    const isExternal = external || href.startsWith("http");

    return (
        <a
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={clsx(
                "text-link hover:text-link/80 transition-colors duration-200",
                // Setup arrow icon via CSS class or inline SVG if preferred.
                // Prompt says "Use CSS ::after to append a small '↗' arrow icon"
                // We'll use a class that has this style or utility.
                isExternal && "external-link inline-flex items-center gap-0.5",
                className
            )}
            {...props}
        >
            {children}
            {isExternal && (
                <span className="text-[0.7em] leading-none ml-0.5" aria-hidden="true">↗</span>
            )}
        </a>
    );
}

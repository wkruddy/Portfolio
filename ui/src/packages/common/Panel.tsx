import { panelClass } from "@portfolio/layout";
import type { PropsWithChildren } from "react";

export function Panel({ children, className = "" }: PropsWithChildren<{ className?: string }>) {
    return <div className={`${panelClass} ${className}`.trim()}>{children}</div>;
}

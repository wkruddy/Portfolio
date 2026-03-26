export const tabButtonClass = (active: boolean) =>
    [
        "relative rounded-full px-4 py-2 text-sm font-medium transition",
        active ? "text-foreground" : "text-muted hover:text-foreground hover:bg-white/5",
    ].join(" ");

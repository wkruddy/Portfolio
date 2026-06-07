export function ContactContent() {
    return (
        <div className="space-y-4">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Contact</p>
            <h2 className="text-3xl font-semibold tracking-tight">Let’s build something useful.</h2>
            <p className="max-w-xl leading-7 text-muted-foreground">
                I’m interested in thoughtful engineering roles, interesting systems problems, and
                opportunities to create leverage through better tools and better software.
            </p>
            <p className="text-sm text-muted-foreground">
                Messages go through a small Node service for validation, spam protection, and
                delivery—no marketing list.
            </p>
        </div>
    );
}

import { Panel } from "@portfolio/common";

export function NowSection() {
    return (
        <Panel className="mb-8 max-w-2xl p-6">
            <div className="space-y-2">
                <p className="text-sm uppercase tracking-[0.2em] text-muted">Now</p>
                <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    Current focus
                </h3>
                <p className="leading-7 text-muted">
                    Building and improving systems where clarity, team leverage, and thoughtful
                    tooling matter.
                </p>
            </div>
        </Panel>
    );
}

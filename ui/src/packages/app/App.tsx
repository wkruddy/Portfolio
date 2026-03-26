import { Navbar, useHashTab } from "@portfolio/common";
import { Contact } from "@portfolio/contact";
import { Home } from "@portfolio/home";
import { sectionWrapClass } from "@portfolio/layout";
import { Work } from "@portfolio/work";
import type { FC } from "react";

export const App: FC = () => {
    const { activeTab, setTab } = useHashTab();

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navbar activeTab={activeTab} onTabChange={setTab} />

            <main className={sectionWrapClass}>
                {activeTab === "home" && (
                    <section className="grid items-center gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:py-10">
                        <Home onTabChange={setTab} />
                    </section>
                )}

                {activeTab === "work" && <Work />}

                {activeTab === "contact" && (
                    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                        <Contact />
                    </section>
                )}
            </main>
        </div>
    );
};

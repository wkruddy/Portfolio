import { type TabKey, AvatarCard } from "@portfolio/common";
import type { FC } from "react";
import { HeroSection } from "./HeroSection";

export const Home: FC<{ onTabChange: (tab: TabKey) => void }> = ({ onTabChange }) => {
    return (
        <>
            <HeroSection onTabChange={onTabChange} />
            <AvatarCard />
        </>
    );
};

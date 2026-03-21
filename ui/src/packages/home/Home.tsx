import type { TabKey } from "@portfolio/common";
import { AvatarCard } from "@portfolio/common";
import type { FC } from "react";
import { HeroSection } from "./HeroSection";

export const Home: FC<{ onTabChange: (tab: TabKey) => void }> = ({ onTabChange }) => (
    <div>
        <HeroSection onTabChange={onTabChange} />
        <AvatarCard />
    </div>
);

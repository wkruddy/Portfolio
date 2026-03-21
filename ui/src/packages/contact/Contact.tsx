import type { FC } from "react";
import { ContactContent } from "./ContactContent";
import { ContactForm } from "./ContactForm";

export const Contact: FC = () => (
    <div>
        <ContactContent />
        <ContactForm />
    </div>
);

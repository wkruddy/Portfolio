import { ContactContent } from "./ContactContent";
import { ContactForm } from "./ContactForm";

export function Contact() {
    return (
        <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <ContactContent />
            <ContactForm />
        </section>
    );
}

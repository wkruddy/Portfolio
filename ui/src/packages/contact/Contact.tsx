import { ContactContent } from "./ContactContent";
import { ContactForm } from "./ContactForm";

export function Contact() {
    return (
        <section className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
            <ContactContent />
            <ContactForm />
        </section>
    );
}

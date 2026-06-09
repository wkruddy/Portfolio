import { Panel } from "@portfolio/common";
import {
    contactFieldGroupClass,
    contactFormClass,
    contactFormContainerClass,
    contactFormPaddingClass,
    contactLabelClass,
    contactNameEmailGridClass,
    fieldClass,
    submitButtonClass,
    textareaClass,
} from "./contact.styles";
import { useContactForm } from "./useContactForm";

export function ContactForm() {
    const { formData, status, fieldErrors, formError, handleChange, handleSubmit } = useContactForm();

    const fieldClassFor = (fieldName: string) =>
        fieldErrors[fieldName]
            ? `${fieldClass} border-rose-300/60 focus-visible:border-rose-300/70 focus-visible:ring-rose-300/20`
            : fieldClass;

    const textareaClassFor = (fieldName: string) =>
        fieldErrors[fieldName]
            ? `${textareaClass} border-rose-300/60 focus-visible:border-rose-300/70 focus-visible:ring-rose-300/20`
            : textareaClass;

    return (
        <Panel className={contactFormContainerClass}>
            <div className={contactFormPaddingClass}>
                <form onSubmit={handleSubmit} className={contactFormClass}>
                    <input
                        type="text"
                        name="company"
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        onChange={handleChange}
                        value={formData.company}
                    />

                    <div className={contactNameEmailGridClass}>
                        <div className={contactFieldGroupClass}>
                            <label className={contactLabelClass} htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={fieldClassFor("name")}
                                placeholder="Your name"
                                required
                                aria-invalid={Boolean(fieldErrors.name)}
                            />
                            {fieldErrors.name && (
                                <p className="text-sm text-rose-300">{fieldErrors.name}</p>
                            )}
                        </div>

                        <div className={contactFieldGroupClass}>
                            <label className={contactLabelClass} htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={fieldClassFor("email")}
                                placeholder="you@example.com"
                                required
                                aria-invalid={Boolean(fieldErrors.email)}
                            />
                            {fieldErrors.email && (
                                <p className="text-sm text-rose-300">{fieldErrors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className={contactFieldGroupClass}>
                        <label className={contactLabelClass} htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={5}
                            className={textareaClassFor("message")}
                            placeholder="Tell me a bit about what you're working on..."
                            required
                            aria-invalid={Boolean(fieldErrors.message)}
                        />
                        {fieldErrors.message && (
                            <p className="text-sm text-rose-300">{fieldErrors.message}</p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3 pt-1">
                        <button
                            type="submit"
                            className={submitButtonClass}
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Sending..." : "Send message"}
                        </button>

                        {status === "success" && (
                            <p className="text-sm text-muted">Thanks — your message was sent.</p>
                        )}
                        {status === "error" && !formError && (
                            <p className="text-sm text-rose-300">Please fix the highlighted fields.</p>
                        )}
                        {status === "error" && formError && (
                            <p className="text-sm text-rose-300">{formError}</p>
                        )}
                    </div>
                </form>
            </div>
        </Panel>
    );
}

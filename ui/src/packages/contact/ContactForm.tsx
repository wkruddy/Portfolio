import { Panel } from "@portfolio/common";
import { fieldClass } from "./contact.styles";
import { useContactForm } from "./useContactForm";

export function ContactForm() {
    const { formData, status, fieldErrors, formError, handleChange, handleSubmit } = useContactForm();

    const fieldClassFor = (fieldName: string) =>
        fieldErrors[fieldName]
            ? `${fieldClass} border-rose-300/60 focus:border-rose-300/70 focus:ring-rose-300/20`
            : fieldClass;

    return (
        <Panel>
            <div className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="company"
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        onChange={handleChange}
                        value={formData.company}
                    />

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-200" htmlFor="name">
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-200" htmlFor="email">
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

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className={fieldClassFor("message")}
                            placeholder="Tell me a bit about what you're working on..."
                            required
                            aria-invalid={Boolean(fieldErrors.message)}
                        />
                        {fieldErrors.message && (
                            <p className="text-sm text-rose-300">{fieldErrors.message}</p>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <button
                            type="submit"
                            className="rounded-2xl bg-gradient-to-r from-sky-300 to-violet-400 px-5 py-3 text-sm font-semibold text-slate-950 shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
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

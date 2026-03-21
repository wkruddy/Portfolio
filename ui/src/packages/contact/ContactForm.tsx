import { useContactForm } from "./useContactForm";

export function ContactForm() {
    const { formData, status, handleChange, handleSubmit } = useContactForm();

    return (
        <div className="rounded-3xl border shadow-sm">
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
                            <label className="text-sm font-medium" htmlFor="name">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2"
                                placeholder="Your name"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            className="w-full rounded-2xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2"
                            placeholder="Tell me a bit about what you're working on..."
                            required
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            type="submit"
                            className="rounded-2xl border px-5 py-3 text-sm font-medium"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? "Sending..." : "Send message"}
                        </button>

                        {status === "success" && (
                            <p className="text-sm text-muted-foreground">
                                Thanks — your message was sent.
                            </p>
                        )}
                        {status === "error" && (
                            <p className="text-sm text-muted-foreground">
                                Something went wrong. Please try again.
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

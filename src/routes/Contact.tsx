import { useEffect, useRef, useState } from "react";
import { addSubmission } from "../store/slices/contactSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ReCAPTCHA from "react-google-recaptcha";


export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
        recaptcha: "",
    });

    // ✅ UI state you were missing
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);
    const d = useAppDispatch();

    const contactInfo = useAppSelector((s:any) => s.contact.submissions);
    console.log({ contactInfo })

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Simple guards (already mirrored in disabled button)
        const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
        if (!form.name.trim() || !emailOk || !form.message.trim() || !form.recaptcha) {
            setError("Please fill all fields correctly.");
            return;
        }

        try {
            setSubmitting(true);
            // mock API call
            d(addSubmission({ name: form.name, email: form.email, message: form.message }));
            await new Promise((r) => setTimeout(r, 1200));

            setSuccess(true);
            setForm({ name: "", email: "", message: "", recaptcha: "" });
        } catch (e) {
            setError("Something went wrong while sending your message. Please try again.");
        } finally {
            setSubmitting(false);
        }
    }

    // focus error for a11y
    useEffect(() => {
        if (error) errorRef.current?.focus();
    }, [error]);

    // auto-hide success after a bit
    useEffect(() => {
        if (!success) return;
        const t = setTimeout(() => setSuccess(false), 4000);
        return () => clearTimeout(t);
    }, [success]);

    return (
        <section className="relative">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                <header className="mb-6">
                    <h2 className="text-2xl font-semibold tracking-tight text-emerald-100">Contact</h2>
                    <p className="text-sm text-emerald-100/70">We usually reply within a business day.</p>
                </header>

                <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
                    <form
                        onSubmit={submit}
                        className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-sm backdrop-blur-sm"
                        noValidate
                    >
                        <div className="grid gap-4">
                            <label className="block">
                                <span className="mb-1 block text-sm font-medium text-emerald-100/90">Name</span>
                                <input
                                    required
                                    autoComplete="name"
                                    placeholder="Your full name"
                                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-[15px] text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                                    value={form.name}
                                    onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1 block text-sm font-medium text-emerald-100/90">Email</span>
                                <input
                                    required
                                    type="email"
                                    autoComplete="email"
                                    inputMode="email"
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-[15px] text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                                    value={form.email}
                                    onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
                                />
                            </label>

                            <label className="block">
                                <span className="mb-1 block text-sm font-medium text-emerald-100/90">Message</span>
                                <textarea
                                    required
                                    rows={6}
                                    placeholder="Tell us a little about what you need…"
                                    className="w-full resize-y rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-[15px] text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                                    value={form.message}
                                    onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
                                />
                                <div className="mt-1 text-xs text-emerald-100/60">{form.message.length}/1000</div>
                            </label>

                            <div className="mt-2">
                                <ReCAPTCHA
                                    sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                                    theme="dark"               // 👈 match dark theme
                                    onChange={(token) => setForm((v) => ({ ...v, recaptcha: token || "" }))}
                                />
                            </div>

                            <div className="mt-4 flex items-center gap-3">
                                <button
                                    type="submit"
                                    disabled={
                                        !form.name.trim() ||
                                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ||
                                        !form.message.trim() ||
                                        !form.recaptcha ||
                                        submitting
                                    }
                                    className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-white shadow-sm ring-1 ring-emerald-400/60 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {submitting ? (
                                        <>
                                            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                                            </svg>
                                            Sending…
                                        </>
                                    ) : (
                                        "Send"
                                    )}
                                </button>
                                <p className="text-xs text-emerald-100/70">We’ll never share your email.</p>
                            </div>

                            {/* Alerts */}
                            {error && (
                                <div
                                    ref={errorRef}
                                    tabIndex={-1}
                                    className="mt-3 rounded-lg bg-red-500/10 p-3 text-sm text-red-200 ring-1 ring-red-400/30"
                                    aria-live="assertive"
                                >
                                    {error}
                                </div>
                            )}
                            {success && (
                                <div
                                    className="mt-3 rounded-lg bg-emerald-500/10 p-3 text-sm text-emerald-200 ring-1 ring-emerald-400/30"
                                    aria-live="polite"
                                >
                                    Thanks! Your message has been sent.
                                </div>
                            )}
                        </div>
                    </form>

                    <aside className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-sm backdrop-blur-sm">
                        <h3 className="text-sm font-semibold text-emerald-100">Prefer email?</h3>
                        <p className="mt-1 text-sm text-emerald-100/80">kaushikd696@gmail.com</p>

                        <h3 className="mt-5 text-sm font-semibold text-emerald-100">Hours</h3>
                        <p className="mt-1 text-sm text-emerald-100/80">Mon–Fri · 9:00–18:00 IST</p>

                        <h3 className="mt-5 text-sm font-semibold text-emerald-100">Location</h3>
                        <p className="mt-1 text-sm text-emerald-100/80">Tripura, IN</p>
                    </aside>
                </div>
            </div>
        </section>

    );
}

// Home.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <section className="relative w-full">
            <div className="relative isolate min-h-[calc(100dvh-56px)] overflow-hidden">
                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=2000&q=80')",
                    }}
                    aria-hidden
                />
                {/* Dark overlay + aurora */}
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.7),rgba(0,0,0,0.7))]" />
                <div className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_10%,rgba(16,185,129,0.25),transparent),radial-gradient(700px_400px_at_90%_0%,rgba(20,184,166,0.18),transparent)]" />
                {/* subtle noise (optional) */}
                <div className="absolute inset-0 opacity-[0.07] [background-image:url('data:image/svg+xml;utf8,<svg xmlns=http://www.w3.org/2000/svg width=160 height=160 viewBox=0 0 160 160><filter id=noise><feTurbulence type=fractalNoise baseFrequency=.8 numOctaves=2/></filter><rect width=100% height=100% filter=url(%23noise)/></svg>')]" />

                {/* content */}
                <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 py-20">
                    <div className="max-w-2xl">
                        <motion.h1
                            initial={{ y: 18, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 120, damping: 16 }}
                            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white"
                        >
                            Relax. Rejuvenate. Repeat.
                        </motion.h1>

                        <motion.p
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.08 }}
                            className="mt-4 max-w-xl text-lg leading-7 text-emerald-100/80"
                        >
                            Premium spa & wellness services, curated content, and seamless bookings—built like a product.
                        </motion.p>

                        <motion.div
                            initial={{ y: 12, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.14 }}
                            className="mt-8 flex flex-wrap gap-3"
                        >
                            <Link
                                to="/services"
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-white shadow-sm ring-1 ring-emerald-400/60 transition hover:bg-emerald-400"
                            >
                                Browse Services
                            </Link>

                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-emerald-100/90 shadow-sm backdrop-blur transition hover:bg-white/10"
                            >
                                Read the Blog
                            </Link>
                        </motion.div>

                        {/* trust badges */}
                        <motion.ul
                            initial="hidden"
                            animate="show"
                            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
                            className="mt-8 grid grid-cols-2 gap-3 text-sm text-emerald-100/80 sm:grid-cols-3"
                        >
                            {["Certified Therapists", "Premium Products", "Easy Booking"].map((t) => (
                                <motion.li
                                    key={t}
                                    variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                                    className="flex items-center gap-2 rounded-lg bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur"
                                >
                                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" />
                                    {t}
                                </motion.li>
                            ))}
                        </motion.ul>

                        {/* mini KPIs / social proof */}
                        <div className="mt-8 grid grid-cols-3 gap-4 max-w-md">
                            {[
                                { k: "25k+", v: "Monthly readers" },
                                { k: "4.9★", v: "Avg. rating" },
                                { k: "2k+", v: "Bookings completed" },
                            ].map((i) => (
                                <div key={i.k} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                                    <div className="text-xl font-bold text-white">{i.k}</div>
                                    <div className="text-xs text-emerald-100/70">{i.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* bottom gradient edge */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#041e1d] to-transparent" />
            </div>
        </section>
    );
}

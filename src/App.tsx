// AppShell.tsx
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------- link styles ---------- */
const linkBase =
  "rounded-lg px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-emerald-400/50";
const linkInactive = "text-emerald-100/80 hover:text-white hover:bg-white/5";
const linkActive = "text-emerald-300 bg-emerald-400/10 ring-1 ring-emerald-400/30";

function NavItem({ to, children, onClick }: any) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [linkBase, isActive ? linkActive : linkInactive].join(" ")
      }
    >
      {children}
    </NavLink>
  );
}

export default function AppShell() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const location = useLocation();

  /* close on route change */
  useEffect(() => setOpen(false), [location.pathname]);

  /* close with Esc */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  /* lock scroll when overlay open */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="min-h-dvh flex flex-col bg-[#041e1d]">
      {/* Header */}
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="sticky top-0 z-40 border-b border-white/10 
             bg-[#041e1d]/70 backdrop-blur-md supports-[backdrop-filter]:bg-[#041e1d]/60"
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Brand */}
          <NavLink
            to="/"
            className="group inline-flex items-center gap-2 rounded-xl px-2 py-1"
          >
            <div className="grid h-8 w-8 place-items-center rounded-lg 
                      bg-emerald-500/20 ring-1 ring-emerald-400/40">
              <span className="text-sm font-bold text-emerald-300">SM</span>
            </div>
            <span className="text-sm font-semibold tracking-wide text-emerald-100">
              Service Manager
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden gap-1 md:flex">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/blog">Blog</NavItem>
            <NavItem to="/contact">Contact</NavItem>
          </nav>

          {/* Hamburger (mobile) */}
          <button
            ref={btnRef}
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 text-emerald-100 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
              <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Slide-in panel */}
            <motion.nav
              id="mobile-menu"
              className="fixed inset-y-0 right-0 z-50 w-[85%] max-w-sm bg-[#062f2e] p-6 ring-1 ring-white/10 md:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 160, damping: 22 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold tracking-wide text-emerald-100">
                  Menu
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg ring-1 ring-white/10 text-emerald-100 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  aria-label="Close menu"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.6" />
                  </svg>
                </button>
              </div>

              <div className="mt-6 grid gap-2">
                <NavItem to="/" onClick={() => setOpen(false)}>Home</NavItem>
                <NavItem to="/services" onClick={() => setOpen(false)}>Services</NavItem>
                <NavItem to="/blog" onClick={() => setOpen(false)}>Blog</NavItem>
                <NavItem to="/contact" onClick={() => setOpen(false)}>Contact</NavItem>
              </div>

              {/* Optional blurb */}
              <div className="mt-8 rounded-xl bg-white/5 p-4 ring-1 ring-white/10">
                <p className="text-sm text-emerald-100/80">
                  Looking for something specific? Check our latest posts in the Blog.
                </p>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <main className="w-full flex-1 min-h-[calc(100dvh-56px-60px)] bg-[radial-gradient(1200px_800px_at_80%_-10%,rgba(16,185,129,0.15),transparent)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-[#062f2e]">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 inline-flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-500/20 ring-1 ring-emerald-400/40">
                  <span className="text-sm font-bold text-emerald-300">SM</span>
                </div>
                <div className="text-sm font-semibold text-emerald-200">
                  Service Manager
                </div>
              </div>
              <p className="text-sm text-emerald-100/70">
                Premium spa & wellness services, tailored like a product.
              </p>
            </div>

            <div className="flex gap-8">
              <ul className="space-y-2 text-sm">
                <li className="text-emerald-300 font-medium">Product</li>
                <li><NavLink to="/services" className="text-emerald-100/80 hover:text-white">Services</NavLink></li>
                <li><NavLink to="/blog" className="text-emerald-100/80 hover:text-white">Blog</NavLink></li>
                <li><NavLink to="/contact" className="text-emerald-100/80 hover:text-white">Contact</NavLink></li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="text-emerald-300 font-medium">Company</li>
                <li><a className="text-emerald-100/80 hover:text-white" href="#">About</a></li>
                <li><a className="text-emerald-100/80 hover:text-white" href="#">Careers</a></li>
                <li><a className="text-emerald-100/80 hover:text-white" href="#">Privacy</a></li>
              </ul>
            </div>

            <div className="flex items-end md:justify-end">
              <p className="text-sm text-emerald-100/70">
                © {new Date().getFullYear()} Service Manager
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

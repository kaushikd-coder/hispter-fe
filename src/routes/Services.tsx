import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
    loadServices,
    setQuery,
    setCategory,
    setMaxPrice,
} from "../store/slices/servicesSlice";



const fallbackImg =
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1200&q=60";


export default function Services() {
    const d = useAppDispatch();
    const { items, status, query, category, maxPrice } = useAppSelector(
        (s:any) => s.services
    );

    // const [item, setItems] = useState<any[]>([]);
    // const [loading, setLoading] = useState(true);
    // const [err, setErr] = useState<string | null>(null);

    console.log({ items })

    // useEffect(() => {

    //     const loadData = async () => {
    //         try {
    //             const data = await fetchServices();    
    //             const simplified = data.map(mapService); 
    //             setItems(simplified);
    //         } catch (e: any) {
    //             setErr(e.message || "Failed to load services");
    //         } finally {
    //             setLoading(false);
    //         }
    //     }

    //     loadData();
    // }, []);

    useEffect(() => {
        d(loadServices());
    }, [d]);

    const filtered = useMemo(() => {
        return items.filter((s) => {
            const q = query.toLowerCase();
            const okQuery =
                !q ||
                s.title.toLowerCase().includes(q) ||
                s.description.toLowerCase().includes(q);
            const okCat = category === "all" || s.category === category;
            const numeric = Number(String(s.price).replace(/[^\d]/g, ""));
            const okPrice = !maxPrice || numeric <= maxPrice;
            return okQuery && okCat && okPrice;
        });
    }, [items, query, category, maxPrice]);



    return (
        <section className="relative h-auto">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* header */}
                <header className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100">
                            Services
                        </h2>
                        <p className="text-sm text-emerald-100/70">
                            Find your next treatment from our curated list.
                        </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-400/30">
                        {filtered.length} {filtered.length === 1 ? "result" : "results"}
                    </span>
                </header>

                {/* filters */}
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <input
                        className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                        placeholder="Search…"
                        value={query}
                        onChange={(e) => d(setQuery(e.target.value))}
                    />

                    <select
                        className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none ring-emerald-400/40 focus:ring-2"
                        value={category}
                        onChange={(e) => d(setCategory(e.target.value))}
                    >
                        <option className="bg-[#041e1d]" value="all">All categories</option>
                        <option className="bg-[#041e1d]">Massage</option>
                        <option className="bg-[#041e1d]">Skin Care</option>
                        <option className="bg-[#041e1d]">Wellness</option>
                    </select>

                    <input
                        className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                        type="number"
                        placeholder="Max price (₹)"
                        value={maxPrice}
                        min={0}
                        onChange={(e) =>
                            d(setMaxPrice(e.target.value ? Number(e.target.value) : null))
                        }
                    />
                </div>

                {/* loading / error */}
                {status === "loading" && (
                    <p className="mt-10 text-center text-emerald-100/70">Loading services…</p>
                )}
                {status === "error" && (
                    <p className="mt-10 text-center text-red-400">Failed to load services.</p>
                )}

                {/* empty state */}
                {status === "success" && filtered.length === 0 && (
                    <div className="mt-16 flex flex-col items-center text-center">
                        <img
                            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                            alt="No results"
                            className="h-40 opacity-90"
                        />
                        <h3 className="mt-6 text-lg font-semibold text-emerald-100">
                            No services found
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-emerald-100/70">
                            Try adjusting your filters or search for something else.
                        </p>
                        <button
                            onClick={() => {
                                d(setQuery(""));
                                d(setCategory("all"));
                                d(setMaxPrice(null));
                            }}
                            className="mt-4 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-white shadow-sm ring-1 ring-emerald-400/60 transition hover:bg-emerald-400"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {/* grid */}
                {filtered.length > 0 ? (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((s) => (
                            <article
                                key={s.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-sm transition duration-200 hover:shadow-lg hover:border-emerald-400/30"
                            >
                                {/* image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={s.image || fallbackImg}
                                        alt={s.title}
                                        loading="lazy"
                                        onError={(e) => ((e.currentTarget.src = fallbackImg))}
                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#041e1d] via-transparent to-transparent opacity-70" />
                                    <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-emerald-100 ring-1 ring-white/20 backdrop-blur">
                                        {s.category}
                                    </span>
                                </div>

                                {/* body */}
                                <div className="p-4">
                                    <h3 className="line-clamp-1 text-[15px] font-semibold text-white">
                                        {s.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-emerald-100/80">
                                        {s.description}
                                    </p>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-base font-semibold text-emerald-200">
                                            {s.price}
                                        </span>
                                        <button className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-emerald-50 transition hover:bg-white/10 hover:border-white/25">
                                            See details
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="mt-16 flex flex-col items-center text-center">
                        <img
                            src="https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80"
                            alt="No results illustration"
                            className="h-40 opacity-90 rounded-3xl"
                        />
                        <h3 className="mt-6 text-lg font-semibold text-emerald-100">
                            No services found
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-emerald-100/70">
                            Try adjusting your filters or search for something else.
                        </p>
                        <button
                            onClick={() => {
                                d(setQuery(""));
                                d(setCategory("all"));
                                d(setMaxPrice(null));
                            }}
                            className="mt-4 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-white shadow-sm ring-1 ring-emerald-400/60 transition hover:bg-emerald-400"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>
        </section>

    );
}

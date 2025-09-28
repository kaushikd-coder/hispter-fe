import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loadBlogs, setQuery } from "../store/slices/blogsSlice";


export default function Blog() {
    const d = useAppDispatch();
    const nav = useNavigate();
    const { items, status, query } = useAppSelector((s:any) => s.blogs);

    const fallbackImg =
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";



    useEffect(() => { d(loadBlogs()); }, [d]);
    const filtered = useMemo(() => items.filter(b => {
        const q = query.toLowerCase();
        return !q || b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q);
    }), [items, query]);


    //     useEffect(() => {

    //     const loadData = async () => {
    //         try {
    //             const data = await fetchPosts();    
    //             const simplified = data.map(mapPost); 
    //             console.log("Fetched services:", simplified);
                
    //         } catch (e: any) {
    //             // setErr(e.message || "Failed to load services");
    //         } finally {
    //             // setLoading(false);
    //         }
    //     }

    //     loadData();
    // }, []);

    return (
        <section className="relative h-auto">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* header */}
                <header className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100">
                            Blog
                        </h2>
                        <p className="text-sm text-emerald-100/70">
                            Read tips, stories, and updates from our team.
                        </p>
                    </div>

                    <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200 ring-1 ring-emerald-400/30">
                        {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                    </span>
                </header>

                {/* filters */}
                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    <input
                        className="rounded-xl border border-white/10 bg-white/10 px-3 py-2.5 text-emerald-50 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] outline-none placeholder:text-emerald-100/50 ring-emerald-400/40 focus:ring-2"
                        placeholder="Search posts…"
                        value={query}
                        onChange={(e) => d(setQuery(e.target.value))}
                    />
                    <div className="hidden md:block" />
                </div>

                {/* loading / error */}
                {status === "loading" && (
                    <p className="mt-10 text-center text-emerald-100/70">Loading posts…</p>
                )}
                {status === "error" && (
                    <p className="mt-10 text-center text-red-400">Failed to load posts.</p>
                )}

                {/* empty state */}
                {status === "success" && filtered.length === 0 && (
                    <div className="mt-16 flex flex-col items-center text-center">
                        <img
                            src="https://illustrations.popsy.co/white/searching.svg"
                            alt="No results"
                            className="h-40 opacity-90"
                        />
                        <h3 className="mt-6 text-lg font-semibold text-emerald-100">
                            No posts found
                        </h3>
                        <p className="mt-2 max-w-sm text-sm text-emerald-100/70">
                            Try a different search term or clear your filters.
                        </p>
                        <button
                            onClick={() => {
                                d(setQuery(""));
                            }}
                            className="mt-4 inline-flex items-center rounded-xl bg-emerald-500 px-4 py-2 text-white shadow-sm ring-1 ring-emerald-400/60 transition hover:bg-emerald-400"
                        >
                            Reset filters
                        </button>
                    </div>
                )}

                {/* grid */}
                {filtered.length > 0 && (
                    <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filtered.map((b) => (
                            <article
                                key={b.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm shadow-sm transition duration-200 hover:shadow-lg hover:border-emerald-400/30"
                            >
                                {/* image */}
                                <div className="relative aspect-[16/10] overflow-hidden">
                                    <img
                                        src={b.image || fallbackImg}
                                        alt={b.title}
                                        loading="lazy"
                                        onError={(e) => ((e.currentTarget.src = fallbackImg))}
                                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                                    />
                                    {b.category && (
                                        <span className="absolute left-3 top-3 rounded-full bg-black/40 px-2 py-1 text-xs font-medium text-emerald-100 ring-1 ring-white/20 backdrop-blur">
                                            {b.category}
                                        </span>
                                    )}
                                </div>

                                {/* content */}
                                <div className="p-4">
                                    <h3 className="line-clamp-1 text-[15px] font-semibold text-white">
                                        {b.title}
                                    </h3>
                                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-emerald-100/80">
                                        {b.excerpt}
                                    </p>

                                    <div className="mt-3 flex items-center justify-between">
                                        {b.date && (
                                            <time
                                                dateTime={b.date}
                                                className="text-sm text-emerald-100/60"
                                            >
                                                {new Date(b.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "long",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        )}
                                        <button
                                            onClick={() => nav(`/blog/${b.id}`)}
                                            className="inline-flex items-center rounded-lg border border-white/15 px-3 py-1.5 text-sm font-medium text-emerald-50 transition hover:bg-white/10 hover:border-white/25"
                                        >
                                            Read more
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>


    );
}

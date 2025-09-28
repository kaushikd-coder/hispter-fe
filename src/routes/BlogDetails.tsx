import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import ReactMarkdown from "react-markdown";

export default function BlogDetails() {
    const { id } = useParams();
    const post = useAppSelector((s:any) => s.blogs.items.find(b => String(b.id) === id));

    if (!post) return (
        <div className="mx-auto max-w-3xl px-4 py-16">
            <div className="relative overflow-hidden rounded-2xl bg-white/5 p-8 ring-1 ring-white/10 backdrop-blur">
                {/* soft spotlight */}
                <div className="pointer-events-none absolute -top-24 right-0 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />

                <div className="flex items-start gap-4">
                    {/* icon */}
                    <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-400/30">
                        <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="h-6 w-6 text-emerald-300"
                        >
                            <path
                                fill="currentColor"
                                d="M12 2a1 1 0 0 1 .9.55l9 18A1 1 0 0 1 21 22H3a1 1 0 0 1-.9-1.45l9-18A1 1 0 0 1 12 2Zm0 5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0V8a1 1 0 0 0-1-1Zm0 10a1.25 1.25 0 1 0 0-2.5A1.25 1.25 0 0 0 12 17Z"
                            />
                        </svg>
                    </div>

                    {/* content */}
                    <div>
                        <h1 className="text-xl font-semibold text-white">Post not found</h1>
                        <p className="mt-1 text-sm text-slate-200/80">
                            The article you’re looking for doesn’t exist or may have been moved.
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 rounded-xl bg-emerald-600/90 px-4 py-2 text-sm font-medium text-white ring-1 ring-emerald-400/40 transition hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            >
                                ← Back to Blog
                            </Link>

                            <Link
                                to="/"
                                className="inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-emerald-200 ring-1 ring-white/10 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                            >
                                Go to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <article className="mx-auto max-w-4xl px-4 py-10">
            {/* Featured Image */}
            <img
                src={post.image}
                alt={post.title}
                className="mb-6 w-full max-h-[420px] rounded-xl object-cover shadow-lg ring-1 ring-white/10"
            />

            {/* Title & Meta */}
            <h1 className="text-3xl font-bold tracking-tight text-emerald-50">
                {post.title}
            </h1>
            <p className="mt-1 text-sm text-emerald-100/70">
                Published in 2025 · 5 min read
            </p>

            {/* Content */}
            {/* Content */}
            <div
                className="prose prose-invert mt-6 max-w-none
                prose-headings:text-white
                prose-p:text-white
                prose-li:text-white
                prose-strong:text-white
                prose-a:text-emerald-300 hover:prose-a:text-emerald-200
                prose-code:text-white
                text-emerald-100"
            >
                <ReactMarkdown>{post.content}</ReactMarkdown>
            </div>


            {/* Back button */}
            <div className="mt-10">
                <Link
                    to="/blog"
                    className="inline-flex items-center rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-sm font-medium text-emerald-50 shadow-sm transition hover:bg-white/10 hover:border-white/25"
                >
                    ← Back to Blog
                </Link>
            </div>
        </article>

    );
}

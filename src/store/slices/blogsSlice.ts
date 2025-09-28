import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../../../api/posts";
import { mapPost, type Post } from "../../../mappers/post";


export type Blog = {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image: string;
};
type State = {
    items: Blog[];
    status: "idle" | "loading" | "error";
    query: string;
};
const initialState: State = { items: [], status: "idle", query: "" };


// local json file
// ---------------------
// export const loadBlogs = createAsyncThunk("blogs/load", async () => {
//     const res = await fetch("/data/blogs.json");
//     if (!res.ok) throw new Error("Failed to load blogs");
//     return (await res.json()) as Blog[];
// });

// fetch from WP API
// ---------------------
export const loadBlogs = createAsyncThunk<Post[]>(
    "blogs/load",
    async () => {
        const data = await fetchPosts();
        const simplified = data.map(mapPost);
        return simplified;
    }
);

const blogsSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {
        setQuery: (s, a) => {
            s.query = a.payload;
        },
    },
    extraReducers: (b) => {
        b.addCase(loadBlogs.pending, (s) => {
            s.status = "loading";
        });
        b.addCase(loadBlogs.fulfilled, (s, a) => {
            s.status = "idle";
            s.items = a.payload;
        });
        b.addCase(loadBlogs.rejected, (s) => {
            s.status = "error";
        });
    },
});

export const { setQuery } = blogsSlice.actions;
export default blogsSlice.reducer;

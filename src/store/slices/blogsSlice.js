import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts } from "../../../api/posts";
import { mapPost } from "../../../mappers/post";
const initialState = { items: [], status: "idle", query: "" };
// export const loadBlogs = createAsyncThunk("blogs/load", async () => {
//     const res = await fetch("/data/blogs.json");
//     if (!res.ok) throw new Error("Failed to load blogs");
//     return (await res.json()) as Blog[];
// });
export const loadBlogs = createAsyncThunk("blogs/load", async () => {
    const data = await fetchPosts();
    const simplified = data.map(mapPost);
    return simplified;
});
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

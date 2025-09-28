# Service Manager

A modern React + TypeScript + Vite app for spa & wellness services, with blog and contact features.

---

## 🚀 Running Locally

1. **Install dependencies:**
   ```sh
   npm install
   ```

2. **Start the development server:**
   ```sh
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

3. **Environment variables:**
   - Edit [.env](.env) for local API keys and endpoints.
   - By default, the app uses a demo WordPress API and a test reCAPTCHA key.

---

## 🔄 Switching Data Source: Local JSON vs. WordPress API

By default, the app fetches data from a WordPress API.  
To use local JSON files instead (for offline/local demo):

1. **Open** [`src/store/slices/servicesSlice.ts`](src/store/slices/servicesSlice.ts) and [`src/store/slices/blogsSlice.ts`](src/store/slices/blogsSlice.ts).

2. **Switch to local JSON:**
   - **Uncomment** the code block labeled `local json file`.
   - **Comment out** the code block labeled `fetch from WP API`.

   Example in [`servicesSlice.ts`](src/store/slices/servicesSlice.ts):
   ```ts
   // export const loadServices = createAsyncThunk("services/load", async () => {
   //     const res = await fetch("/data/services.json");
   //     if (!res.ok) throw new Error("Failed to load services");
   //     return (await res.json()) as Service[];
   // });

   // export const loadServices = createAsyncThunk<Service[]>( ... ) // <-- comment this out
   ```

   Example in [`blogsSlice.ts`](src/store/slices/blogsSlice.ts):
   ```ts
   // export const loadBlogs = createAsyncThunk("blogs/load", async () => {
   //     const res = await fetch("/data/blogs.json");
   //     if (!res.ok) throw new Error("Failed to load blogs");
   //     return (await res.json()) as Blog[];
   // });

   // export const loadBlogs = createAsyncThunk<Post[]>( ... ) // <-- comment this out
   ```

3. **Local JSON files are in:**
   - [`public/data/services.json`](public/data/services.json)
   - [`public/data/blogs.json`](public/data/blogs.json)

---

## 🌐 Deploying the Live Demo

This project is ready for deployment on [Vercel](https://vercel.com/) or any static host.

1. **Build the app:**
   ```sh
   npm run build
   ```

2. **Preview the production build locally:**
   ```sh
   npm run preview
   ```

3. **Deploy to Vercel:**
   - Push your code to GitHub.
   - Import the repo in Vercel.
   - Vercel will use the [vercel.json](vercel.json) config:
     - Build command: `npm run build`
     - Output directory: `dist`
     - Custom headers and rewrites are set for SPA routing and security.

   - **Environment variables:**  
     Set `VITE_WP_URL` and `VITE_RECAPTCHA_SITE_KEY` in your Vercel project settings for production.

---

## 📝 Notes

- To use the WordPress API, set `VITE_WP_URL` in your `.env` file.
- For reCAPTCHA, set `VITE_RECAPTCHA_SITE_KEY` (a test key is provided for development).
- The app uses [Tailwind CSS](https://tailwindcss.com/) for styling.

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchServices } from "../../../api/services";
import { mapService } from "../../../mappers/service";


export type Service = {
    id: number;
    title: string;
    description: string;
    price: string;
    image: string;
    category: string;
};
type State = {
    items: Service[];
    status: "idle" | "loading" | "error";
    query: string;
    category: string | "all";
    maxPrice: number | null;
};

const initialState: State = {
    items: [],
    status: "idle",
    query: "",
    category: "all",
    maxPrice: null,
};

// local json file
// ---------------------
// export const loadServices = createAsyncThunk("services/load", async () => {
//     const res = await fetch("/data/services.json");
//     if (!res.ok) throw new Error("Failed to load services");
//     return (await res.json()) as Service[];
// });

// fetch from WP API
// ---------------------
export const loadServices = createAsyncThunk<Service[]>(
    "services/load",
    async () => {
        const data = await fetchServices();
        const simplified = data.map(mapService);
        return simplified;
    }
);

const servicesSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        setQuery: (s, a) => {
            s.query = a.payload;
        },
        setCategory: (s, a) => {
            s.category = a.payload;
        },
        setMaxPrice: (s, a) => {
            s.maxPrice = a.payload;
        },
    },
    extraReducers: (b) => {
        b.addCase(loadServices.pending, (s) => {
            s.status = "loading";
        });
        b.addCase(loadServices.fulfilled, (s, a) => {
            s.status = "idle";
            s.items = a.payload;
        });
        b.addCase(loadServices.rejected, (s) => {
            s.status = "error";
        });
    },
});

export const { setQuery, setCategory, setMaxPrice } = servicesSlice.actions;
export default servicesSlice.reducer;

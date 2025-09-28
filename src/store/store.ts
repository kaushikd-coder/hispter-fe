import { configureStore } from "@reduxjs/toolkit";
import servicesReducer from "./slices/servicesSlice";
import blogsReducer from "./slices/blogsSlice";
import contactReducer from "./slices/contactSlice";

export const store = configureStore({
  reducer: {
    services: servicesReducer,
    blogs: blogsReducer,
    contact: contactReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

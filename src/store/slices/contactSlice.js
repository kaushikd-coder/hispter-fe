import { createSlice } from "@reduxjs/toolkit";
const initialState = { submissions: [] };
const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addSubmission: (s, a) => {
            s.submissions.push({
                id: crypto.randomUUID(),
                createdAt: new Date().toISOString(),
                ...a.payload,
            });
        },
    },
});
export const { addSubmission } = contactSlice.actions;
export default contactSlice.reducer;

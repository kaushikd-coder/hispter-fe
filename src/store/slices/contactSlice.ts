import { createSlice } from "@reduxjs/toolkit";
type Message = {
    id: string;
    name: string;
    email: string;
    message: string;
    createdAt: string;
};
type State = { submissions: Message[] };
const initialState: State = { submissions: [] };

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

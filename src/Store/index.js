import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "./Slices/UserSlice";
import AuthSlice from "./Slices/AuthSlice";
import GraphSlice from "./Slices/GraphSlice";
import ModalSlice from "./Slices/ModalSlice.js";
import LocationSlice from "./Slices/LocationSlice";
import CalendarSlice from "./Slices/CalendarSlice";
import RecommendedSlice from "./Slices/RecommendedSlice";

const store = configureStore({
    reducer: {
        user: UserSlice,
        auth: AuthSlice,
        graph: GraphSlice,
        modal: ModalSlice,
        location: LocationSlice,
        calendar: CalendarSlice,
        recommended: RecommendedSlice,
    },
    // Middleware ļauj pārtvert katru ,uz reduktoru nosūtīto, darbību, lai varētu veikt izmaiņas darbībā, vai atcelt darbību.
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export default store;
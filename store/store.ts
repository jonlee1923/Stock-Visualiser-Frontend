import { configureStore } from "@reduxjs/toolkit";
import tickerDetailsReducer from "./features/historicalData/historicalDataSlice";
export const store = configureStore({
    reducer: {
        tickerDetails: tickerDetailsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

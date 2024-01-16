import { configureStore } from "@reduxjs/toolkit";
import tickerDetailsReducer from "./features/historicalData/historicalDataSlice";
import { stocksApi } from "./features/api/apiSlice";
export const store = configureStore({
    reducer: {
        tickerDetails: tickerDetailsReducer,
        [stocksApi.reducerPath]:stocksApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(stocksApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

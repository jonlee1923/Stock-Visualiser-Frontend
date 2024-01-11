import { TickerResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface TickerDetailsSlice {
    details: TickerResponse;
}

const initialState: TickerDetailsSlice = {
    details: {
        ticker: "",
        name: "",
        market: "",
        locale: "",
        primary_exchange: "",
        type: "",
        active: false,
        currency_name: "",
        cik: "",
        composite_figi: "",
        share_class_figi: "",
        last_updated_utc: "",
    },
};

export const tickerDetailsSlice = createSlice({
    name: "tickerDetails",
    initialState,
    reducers: {
        setDetails: (state, action: PayloadAction<TickerResponse>) => {
            state.details = action.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { setDetails } = tickerDetailsSlice.actions;

export default tickerDetailsSlice.reducer;

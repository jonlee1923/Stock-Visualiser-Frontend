import { ChartFilter } from "@/constants";
import { TickerResponse } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { AggregateResponse } from "@/types";

export interface TickerDetailsSlice {
    details: TickerResponse;
    filterTimespan: string;
    filterDateRange: FilterDateRange;
    aggregateData: AggregateResponse[];
}

export interface FilterDateRange {
    from: string;
    to: string;
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
    filterTimespan: "DAY",
    filterDateRange: {
        from: Date.now().toLocaleString(),
        to: Date.now().toLocaleString(),
    },
    aggregateData:[]
};

export const tickerDetailsSlice = createSlice({
    name: "tickerDetails",
    initialState,
    reducers: {
        setDetails: (state, action: PayloadAction<TickerResponse>) => {
            state.details = action.payload;
        },
        setFilter: (state, action: PayloadAction<string>) => {
            state.filterTimespan = action.payload;
        },
        setDateRange: (state, action: PayloadAction<FilterDateRange>) => {
            state.filterDateRange = action.payload;
        },
        setAggData: (state, action: PayloadAction<AggregateResponse[]>) =>{
            state.aggregateData = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setDetails, setFilter, setDateRange, setAggData } = tickerDetailsSlice.actions;

export default tickerDetailsSlice.reducer;

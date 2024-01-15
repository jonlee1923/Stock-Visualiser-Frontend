"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getAggregateData, getTickerData } from "@/services/StockService";
import { useDispatch, useSelector } from "react-redux";
import {
    setDetails,
    setAggData,
} from "../store/features/historicalData/historicalDataSlice";
import { AggregateResponse, TickerResponse } from "@/types";
import { RootState } from "@/store/store";
import toast from "react-hot-toast";

const Navbar = () => {
    const [symbol, setSymbol] = useState<string>("");
    const chartFilterTimespan: string = useSelector(
        (state: RootState) => state.tickerDetails.filterTimespan
    );

    const from = "2024-01-02";
    const to = "2024-01-04";
    const dispatch = useDispatch();

    const fetchData = async () => {
        console.log("Called");
        const data: TickerResponse[] = await getTickerData({ symbol });
        const response: AggregateResponse[] = await getAggregateData({
            symbol,
            timespan: chartFilterTimespan,
            from,
            to,
        });
        dispatch(setDetails(data[0]));
        dispatch(setAggData(response));
    };

    const callFunction = fetchData;

    const notify = () =>
        toast.promise(callFunction(), {
            loading: "Fetching data...",
            success: <b>Data fetched!</b>,
            error: <b>Could not fetch...</b>,
        });

    const onChangeHandler = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setSymbol(event.target.value);
    };

    return (
        <header className="py-6 md:px-16 px-6 z-30 ">
            <div className="w-2/5 flex space-between">
                <nav>
                    <div className="mt-6 flex max-w-md gap-x-4">
                        <input
                            className="min-w-0 flex-auto rounded-md border-2 border-indigo-500/75 bg-white/5 px-3.5 py-2 text-black shadow-sm hover:border-indigo-200/75 active:border-indigo-200"
                            placeholder="Search for a stock..."
                            type="text"
                            onChange={onChangeHandler}
                            value={symbol}
                        />
                        <button
                            onClick={notify}
                            type="submit"
                            className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                        >
                            Search
                        </button>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;

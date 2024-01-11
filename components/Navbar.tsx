"use client";
import Link from "next/link";
import React, { useState } from "react";
import { getTickerData } from "@/services/StockService";
import { useDispatch } from "react-redux";
import { setDetails } from "../store/features/historicalData/historicalDataSlice";
import { TickerResponse } from "@/types";

const Navbar = () => {
    const [symbol, setSymbol] = useState<string>("");
    const dispatch = useDispatch();
    const fetchTickerDetails = async () => {
        const data: TickerResponse[] = await getTickerData({ symbol });
        dispatch(setDetails(data[0]));
    };


    const onChangeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSymbol(event.target.value);
    };


    return (
        <header className="py-6 md:px-16 px-6 border-b border-zinc-800 z-30 ">
            <div className="w-2/5 flex space-between">
                <nav>
                    <div className="mt-6 flex max-w-md gap-x-4">
                        <label
                            htmlFor="email-address"
                            className="sr-only text-black"
                        >
                            Email address
                        </label>
                        <input
                            className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                            placeholder="Search for a stock..."
                            type="text"
                            onChange={onChangeHandler}
                            value={symbol}
                        />
                        <button
                            onClick={fetchTickerDetails}
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

"use client";
import { RootState } from "@/store/store";
import React from "react";
import { useSelector } from "react-redux";

const Overview = () => {
    const ticker: string = useSelector(
        (state: RootState) => state.tickerDetails.symbol
    );

    return (
        <div className="flex border-2 border-zinc-600 rounded-lg shadow-lg p-10 mx-2 text-white">
            <div className="text-5xl">{ticker}</div>
        </div>
    );
};

export default Overview;

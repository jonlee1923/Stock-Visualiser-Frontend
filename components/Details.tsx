"use client";
import { useGetTickerDetailsQuery } from "@/store/features/api/apiSlice";
import { RootState } from "@/store/store";
import { TickerResponse } from "@/types";
import React from "react";
import { useSelector } from "react-redux";
import { BarLoader } from "react-spinners";

const Details = () => {
    const tickerDetails: TickerResponse = useSelector(
        (state: RootState) => state.tickerDetails.details
    );
    const symbol: string = useSelector(
        (state: RootState) => state.tickerDetails.symbol
    );
    const { data, isLoading } = useGetTickerDetailsQuery({ symbol });

    const excluded = ["active", "cik", "composite_figi", "share_class_figi", "ticker"];

    return (
        <div className="flex border-2 border-zinc-600 rounded-lg shadow-lg mx-2">
            {isLoading && <BarLoader color="#36d7b7" />}
            {data != undefined && (
                <div className="w-full h-full flex flex-col justify-between divide-y-1">
                    {Object.entries(data[0]).map(([key, value]) => {
                        if (!excluded.includes(key))
                            return (
                                <div
                                    key={key}
                                    className="flex-1 flex justify-between items-center border-b border-1 border-zinc-600 py-4"
                                >
                                    <span className="ml-4 capitalize">{key}</span>
                                    <span className="font-bold mr-4">{value}</span>
                                </div>
                            );
                    })}
                </div>
            )}
        </div>
    );
};

export default Details;

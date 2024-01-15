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

    return (
        <div className="flex border-2 border-indigo-500/75 rounded-lg shadow-lg p-10 mx-2">
            {isLoading && <BarLoader color="#36d7b7" />}
            {data != undefined && (
                <ul className="w-full h-full flex flex-col justify-between divide-y-1">
                    {Object.entries(data[0]).map(([key, value]) => {
                        return (
                            <li
                                key={key}
                                className="flex-1 flex justify-between items-center"
                            >
                                <span>{key}</span>
                                <span className="font-bold">{value}</span>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default Details;

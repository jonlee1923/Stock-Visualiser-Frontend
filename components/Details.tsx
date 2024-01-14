'use client'
import { RootState } from "@/store/store";
import { TickerResponse } from "@/types";
import React from "react";
import { useSelector } from "react-redux";

const Details = () => {
    const tickerDetails:TickerResponse = useSelector((state: RootState) => state.tickerDetails.details)
    return (
        <div className="flex border-2 border-indigo-500/75 rounded-lg shadow-lg p-10 mx-2">
            <ul className="w-full h-full flex flex-col justify-between divide-y-1">
                {Object.entries(tickerDetails).map(([key,value]) => {
                    return (
                        <li
                            key={key}
                            className="flex-1 flex justify-between items-center"
                        >
                            <span>{key}</span>
                            <span className="font-bold">
                                {value}
                            </span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Details;

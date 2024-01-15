"use client";
import React, { PureComponent, ReactNode } from "react";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";
import { useState, useEffect } from "react";
import { AggregateResponse } from "@/types";
import Filter from "./Filter";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Overlay from "./utils/Overlay";

const Chart = () => {
    const aggregateData: AggregateResponse[] = useSelector(
        (state: RootState) => state.tickerDetails.aggregateData
    );

    return (
        <div className="w-7/8 h-full border-2 border-indigo-500/75 rounded-lg shadow-lg p-10 mx-8">
            <Filter />
            {aggregateData.length === 0 && (
                <div className="relative">
                    <div className="absolute z-20">
                        <div className="border-2 rounded-md flex p-2 translate-x-1/2">
                            Search a stock symbol to begin!
                        </div>
                    </div>
                </div>
            )}
            <ResponsiveContainer>
                <AreaChart
                    data={aggregateData}
                >
                    <defs>
                        <linearGradient id="open" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#65D686"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#65D686"
                                stopOpacity={0}
                            />
                        </linearGradient>
                        <linearGradient id="close" x1="0" y1="0" x2="0" y2="1">
                            <stop
                                offset="5%"
                                stopColor="#FA846F"
                                stopOpacity={0.8}
                            />
                            <stop
                                offset="95%"
                                stopColor="#FA846F"
                                stopOpacity={0}
                            />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="t" />
                    <YAxis domain={["dataMin", "dataMax"]} />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="o"
                        stroke="#23C552"
                        fillOpacity={1}
                        fill="url(#open)"
                    />
                    <Area
                        type="monotone"
                        dataKey="c"
                        stroke="#F84F31"
                        fillOpacity={1}
                        fill="url(#close)"
                    />
                    <Legend />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default Chart;

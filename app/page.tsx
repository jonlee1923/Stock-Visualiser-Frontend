"use client";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

export default function Home() {
    // format t to time
    //
    const data = [
        {
            o: 187.15,
            c: 185.64,
            h: 188.44,
            l: 183.885,
            n: 1008871,
            t: 1704171600000,
            v: 8.1964874e7,
            vw: 185.9465,
        },
        {
            o: 184.22,
            c: 184.25,
            h: 185.88,
            l: 183.43,
            n: 656853,
            t: 1704258000000,
            v: 5.841446e7,
            vw: 184.3226,
        },
        {
            o: 182.15,
            c: 181.91,
            h: 183.0872,
            l: 180.88,
            n: 712692,
            t: 1704344400000,
            v: 7.187867e7,
            vw: 182.0183,
        },
    ];

    const formatDate = (timestamp: number) => {
        const date = new Date(timestamp);
        const formattedDate = date.toLocaleDateString();
        return formattedDate;
    };
    const formatData = data.map((item) => ({
        ...item,
        t: formatDate(item.t),
    }));

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="w-full border-black">
                <AreaChart
                    width={730}
                    height={250}
                    data={formatData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
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
                    <XAxis dataKey="t" domain={["datamin", "datamax"]} />
                    <YAxis domain={["auto", "auto"]} />
                    <CartesianGrid strokeDasharray="3 3" />
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
                </AreaChart>
            </div>
        </main>
    );
}

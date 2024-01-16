"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSymbol } from "../store/features/historicalData/historicalDataSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const [tempSymbol, setTempSymbol] = useState<string>("");
    const dispatch = useDispatch();
    const dispatchSymbol = () => {
        if (tempSymbol == "") {
            toast.error("Invalid symbol...");
            return;
        }
        dispatch(setSymbol(tempSymbol.toUpperCase()));
        setTempSymbol("")
    };
    const onChangeHandler = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTempSymbol(event.target.value);
    };

    return (
        <header className="py-6 md:px-16 px-6 z-30 mb-6 bg-gradient-to-tl from-gray-900 from-40% via-gray-900 via-50% to-indigo-800 to-60%">
            <div className="w-2/5 flex space-between ">
                <nav>
                    <div className="mt-6 flex max-w-md gap-x-4">
                        <input
                            className="uppercase min-w-0 flex-auto rounded-md border-2 border-transparent bg-zinc-600 px-3.5 py-2 shadow-sm hover:border-zinc-300/75"
                            placeholder="Search for a stock..."
                            type="text"
                            onChange={onChangeHandler}
                            value={tempSymbol}
                        />
                        <button
                            onClick={dispatchSymbol}
                            type="submit"
                            className="flex-none rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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

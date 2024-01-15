"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
    setSymbol
} from "../store/features/historicalData/historicalDataSlice";
import toast from "react-hot-toast";

const Navbar = () => {
    const [tempSymbol, setTempSymbol] = useState<string>("");
    const dispatch = useDispatch();
    const dispatchSymbol = () => {
        if(tempSymbol == ""){
            toast.error("Invalid symbol...")
            return
        }
        dispatch(setSymbol(tempSymbol.toUpperCase()))
    };
    const onChangeHandler = (event: {
        target: { value: React.SetStateAction<string> };
    }) => {
        setTempSymbol(event.target.value);
    };

    return (
        <header className="py-6 md:px-16 px-6 z-30 ">
            <div className="w-2/5 flex space-between">
                <nav>
                    <div className="mt-6 flex max-w-md gap-x-4">
                        <input
                            className="uppercase min-w-0 flex-auto rounded-md border-2 border-indigo-500/75 bg-white/5 px-3.5 py-2 text-black shadow-sm hover:border-indigo-200/75 active:border-indigo-200"
                            placeholder="Search for a stock..."
                            type="text"
                            onChange={onChangeHandler}
                            value={tempSymbol}
                        />
                        <button
                            onClick={dispatchSymbol}
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

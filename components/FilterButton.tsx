import React from "react";

interface FilterButtonProps {
    filter: string;
    text: string;
    active: boolean;
    onClick: any;
}

const FilterButton = (props: FilterButtonProps) => {
    return (
        <div>
            <button
                onClick={()=> {
                    props.onClick(props.filter)
                }}
                className={`w-12 m-2 h-8 border-3 border-zinc-600 rounded-md flex items-center justify-center cursor-pointer ${
                    props.active
                        ? "bg-slate-100 text-black"
                        : "text-white"
                } transition duration-100 hover:bg-slate-100 hover:text-black`}
            >
                {props.text}
            </button>
        </div>
    );
};

export default FilterButton;

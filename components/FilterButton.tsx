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
                className={`w-12 m-2 h-8 border-3 border-indigo-700 rounded-md flex items-center justify-center cursor-pointer ${
                    props.active
                        ? "bg-indigo-600 text-gray-100"
                        : "text-indigo-300"
                } transition duration-200 hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700`}
            >
                {props.text}
            </button>
        </div>
    );
};

export default FilterButton;

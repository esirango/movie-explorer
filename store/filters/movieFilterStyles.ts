import clsx from "clsx";

const inputClass =
    "w-60 appearance-none px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 text-sm";

const dropdownClass = " outline-none relative w-60 text-sm z-100";

const listboxButtonClass =
    "w-60 py-2 pl-4 pr-10  rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";

const listboxOptionClass = ({ active, selected }: any) =>
    clsx(
        "cursor-pointer select-none px-4 py-2",
        active &&
            "bg-indigo-100 dark:bg-indigo-700 text-indigo-900 dark:text-white",
        selected && "font-semibold"
    );

export { inputClass, dropdownClass, listboxButtonClass, listboxOptionClass };

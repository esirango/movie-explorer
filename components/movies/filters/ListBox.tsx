import { Listbox } from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import React from "react";
import {
    dropdownClass,
    listboxButtonClass,
    listboxOptionClass,
} from "../../../store/filters/movieFilterStyles";

interface Option {
    id?: string;
    code?: string;
    value?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
}

interface ListBoxProps<T extends string> {
    options: Option[];
    value: string;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    filters: Record<T, any>;
    keyName: T;
}

function ListBox<T extends string>({
    options,
    value,
    setFilters,
    filters,
    keyName,
}: ListBoxProps<T>) {
    return (
        <div className={dropdownClass}>
            <Listbox
                value={value}
                onChange={(val) => setFilters({ ...filters, [keyName]: val })}
            >
                <div className="relative">
                    <Listbox.Button className={listboxButtonClass}>
                        {options.find(
                            (opt) =>
                                opt.id === value ||
                                opt.code === value ||
                                opt.value === value
                        )?.name ||
                            options.find(
                                (opt) =>
                                    opt.id === value ||
                                    opt.code === value ||
                                    opt.value === value
                            )?.label ||
                            "-"}
                        <ChevronDown className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300 pointer-events-none" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 w-full max-h-60 overflow-auto bg-white dark:bg-gray-800 rounded-lg shadow-md z-20">
                        {options.map((opt) => (
                            <Listbox.Option
                                key={opt.id || opt.code || opt.value}
                                value={opt.id || opt.code || opt.value}
                                disabled={opt.disabled}
                                className={({ active, selected }) =>
                                    listboxOptionClass({ active, selected })
                                }
                            >
                                {opt.name || opt.label}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}

export default ListBox;

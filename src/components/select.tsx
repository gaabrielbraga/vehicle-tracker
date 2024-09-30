import React, { SelectHTMLAttributes } from "react";

interface NewSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  placeholder: string;
  options: Array<string>;
}

export function NewSelect({ placeholder, options, ...props }: NewSelectProps) {
  return (
    <div className="relative inline-block w-full">
      <select
        {...props}
        className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      >
        <option disabled selected hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

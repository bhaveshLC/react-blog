import React, { forwardRef, useId } from "react";

const Select = forwardRef<any, any>(
  ({ label, className = "", options, onChange, ...props }, ref) => {
    const id = useId();
    return (
      <div className={`${className}`}>
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          {...props}
          onChange={(e) => onChange && onChange(e.target.value)}
          className="w-full capitalize border border-gray-300 rounded-md p-2 focus:outline-none dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          {options &&
            options.map((option: any, index: any) => (
              <option key={index} value={option} className="dark:bg-gray-800">
                {option}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

export default Select;

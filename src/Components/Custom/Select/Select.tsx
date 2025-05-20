import React, { forwardRef, useId } from "react";

const Select = forwardRef<any, any>(
  ({ label, className = "", options, onChange, ...props }, ref) => {
    const id = useId();
    return (
      <div className={className}>
        {label && <label htmlFor={id}>{label}</label>}
        <select
          ref={ref}
          id={id}
          {...props}
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        >
          {options &&
            options.map((option: any, index: any) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
        </select>
      </div>
    );
  }
);

export default Select;

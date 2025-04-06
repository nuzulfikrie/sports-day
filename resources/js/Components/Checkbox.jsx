import React from 'react';
import { Checkbox as FlowbiteCheckbox } from 'flowbite-react';

export default function Checkbox({ name, value, checked, onChange, children }) {
    return (
        <div className="flex items-center">
            <FlowbiteCheckbox
                id={name}
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {children && (
                <label htmlFor={name} className="ml-2 text-sm text-gray-600">
                    {children}
                </label>
            )}
        </div>
    );
} 
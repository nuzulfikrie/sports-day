import React from 'react';
import { TextInput as FlowbiteTextInput } from 'flowbite-react';

export default function TextInput({ type = 'text', className = '', ...props }) {
    return (
        <FlowbiteTextInput
            type={type}
            className={`rounded-md shadow-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 ${className}`}
            {...props}
        />
    );
} 
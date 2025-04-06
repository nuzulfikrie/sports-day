import React from 'react';
import { Button } from 'flowbite-react';

export default function SecondaryButton({ className = '', disabled, children, ...props }) {
    return (
        <Button
            color="gray"
            className={`${className} ${disabled ? 'opacity-25' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
} 
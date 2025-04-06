import React from 'react';
import { Button } from 'flowbite-react';

export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <Button
            color="failure"
            className={`${className} ${disabled ? 'opacity-25' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
} 
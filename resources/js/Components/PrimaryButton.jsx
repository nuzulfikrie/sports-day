import React from 'react';
import { Button } from 'flowbite-react';

export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <Button
            gradientDuoTone="cyanToBlue"
            className={`${className} ${disabled ? 'opacity-25' : ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </Button>
    );
} 
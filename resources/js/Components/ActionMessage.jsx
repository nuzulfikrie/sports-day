import React from 'react';

export default function ActionMessage({ on, children }) {
    return (
        <div className={`text-sm text-gray-600 ${on ? 'block' : 'hidden'}`}>
            {children}
        </div>
    );
} 
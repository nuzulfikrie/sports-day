import React from 'react';
import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, href, as, children }) {
    const baseClasses = 'block w-full ps-3 pe-4 py-2 border-l-4 text-start text-base font-medium transition duration-150 ease-in-out';
    
    const classes = active
        ? `${baseClasses} border-indigo-400 text-indigo-700 bg-indigo-50 focus:outline-none focus:text-indigo-800 focus:bg-indigo-100 focus:border-indigo-700`
        : `${baseClasses} border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:text-gray-800 focus:bg-gray-50 focus:border-gray-300`;

    if (as === 'button') {
        return (
            <button className={`${classes} w-full text-start`}>
                {children}
            </button>
        );
    }

    if (as === 'a') {
        return (
            <a href={href} className={`${classes} w-full text-start`}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} className={classes}>
            {children}
        </Link>
    );
} 
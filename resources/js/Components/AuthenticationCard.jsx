import React from 'react';
import { Card } from 'flowbite-react';

export default function AuthenticationCard({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}

AuthenticationCard.Logo = function AuthenticationCardLogo({ children }) {
    return (
        <div className="mb-6 flex justify-center">
            {children}
        </div>
    );
}; 
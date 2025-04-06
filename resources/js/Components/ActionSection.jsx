import React from 'react';
import { Card } from 'flowbite-react';

export default function ActionSection({ title, description, children }) {
    return (
        <Card>
            <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-600">{description}</p>
                )}
                <div className="mt-5">{children}</div>
            </div>
        </Card>
    );
} 
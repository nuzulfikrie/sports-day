import React from 'react';
import ApiTokenManager from './Partials/ApiTokenManager';
import AppLayout from '@/Layouts/AppLayout';

export default function Index({ tokens, availablePermissions, defaultPermissions }) {
    return (
        <AppLayout title="API Tokens">
            <AppLayout.Header>
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    API Tokens
                </h2>
            </AppLayout.Header>

            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <ApiTokenManager
                        tokens={tokens}
                        availablePermissions={availablePermissions}
                        defaultPermissions={defaultPermissions}
                    />
                </div>
            </div>
        </AppLayout>
    );
} 
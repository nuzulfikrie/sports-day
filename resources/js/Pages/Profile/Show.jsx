import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button } from 'flowbite-react';

export default function Show({ auth }) {
    return (
        <AppLayout>
            <Head title="Profile" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your account's profile information and email address.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="px-4 py-5 sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Name
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">{auth.user.name}</p>
                                    </div>

                                    <div className="col-span-6 sm:col-span-4">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Email
                                        </label>
                                        <p className="mt-1 text-sm text-gray-900">{auth.user.email}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <Button
                                    gradientDuoTone="cyanToBlue"
                                    href={route('profile.edit')}
                                >
                                    Edit Profile
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 
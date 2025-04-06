import React from 'react';
import { Link } from '@inertiajs/react';
import { Button } from 'flowbite-react';
import { HiAcademicCap } from 'react-icons/hi';

export default function Landing() {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <div className="flex justify-center mb-8">
                            <HiAcademicCap className="h-16 w-16 text-indigo-600" />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                            Welcome to Sports Day
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            Experience the excitement of our annual sports day event with real-time updates and live results.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <Link href={route('register')}>
                                <Button gradientDuoTone="purpleToBlue" size="lg">
                                    Register Now
                                </Button>
                            </Link>
                            <Link href={route('login')} className="text-sm font-semibold leading-6 text-gray-900">
                                Log in <span aria-hidden="true">→</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white py-24 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-indigo-600">Key Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to track sports events
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    Live Results
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Get instant updates on all events and competitions.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    Event Management
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Efficiently manage and track all sports events.</p>
                                </dd>
                            </div>
                            <div className="flex flex-col">
                                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                                    House Points
                                </dt>
                                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                                    <p className="flex-auto">Track house points and overall standings in real-time.</p>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
} 
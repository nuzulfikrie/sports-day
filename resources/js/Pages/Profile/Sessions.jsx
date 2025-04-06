import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, Table } from 'flowbite-react';

export default function Sessions({ auth, sessions }) {
    const logoutOtherBrowserSessions = () => {
        if (confirm('Are you sure you want to log out of your other browser sessions?')) {
            post(route('other-browser-sessions.destroy'));
        }
    };

    return (
        <AppLayout>
            <Head title="Browser Sessions" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Browser Sessions</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage and log out your active sessions on other browsers and devices.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-gray-600">
                                        If necessary, you may log out of all of your other browser sessions across all of your devices. Some of your recent sessions are listed below; however, this list may not be exhaustive. If you feel your account has been compromised, you should also update your password.
                                    </p>
                                </div>

                                {sessions.length > 0 && (
                                    <div className="mt-5">
                                        <Table>
                                            <Table.Head>
                                                <Table.HeadCell>Device</Table.HeadCell>
                                                <Table.HeadCell>IP Address</Table.HeadCell>
                                                <Table.HeadCell>Last Active</Table.HeadCell>
                                            </Table.Head>
                                            <Table.Body>
                                                {sessions.map((session) => (
                                                    <Table.Row key={session.id}>
                                                        <Table.Cell>
                                                            <div className="flex items-center">
                                                                {session.agent.is_desktop ? (
                                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                                    </svg>
                                                                ) : (
                                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                                    </svg>
                                                                )}
                                                                <span className="ml-2">
                                                                    {session.agent.platform} - {session.agent.browser}
                                                                </span>
                                                            </div>
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {session.ip_address}
                                                        </Table.Cell>
                                                        <Table.Cell>
                                                            {session.last_active}
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))}
                                            </Table.Body>
                                        </Table>
                                    </div>
                                )}

                                <div className="flex justify-end">
                                    <Button
                                        color="failure"
                                        onClick={logoutOtherBrowserSessions}
                                    >
                                        Log Out Other Browser Sessions
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Table } from 'flowbite-react';

export default function TeamInvitationIndex({ auth, invitations }) {
    return (
        <AppLayout>
            <Head title="Team Invitations" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Team Invitations</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                View all team invitations.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            {invitations.length > 0 ? (
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Team</Table.HeadCell>
                                        <Table.HeadCell>Role</Table.HeadCell>
                                        <Table.HeadCell>Status</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {invitations.map((invitation) => (
                                            <Table.Row key={invitation.id}>
                                                <Table.Cell>{invitation.team.name}</Table.Cell>
                                                <Table.Cell>
                                                    {invitation.role}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {invitation.status}
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            ) : (
                                <p className="text-sm text-gray-600">
                                    You have no team invitations.
                                </p>
                            )}
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 
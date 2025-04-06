import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, Table, Badge } from 'flowbite-react';
import { HiPlus, HiPencil, HiTrash, HiEye } from 'react-icons/hi';

export default function EventsIndex({ events }) {
    return (
        <AppLayout>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-gray-900">Events</h1>
                    <Link href={route('events.create')}>
                        <Button gradientDuoTone="cyanToBlue">
                            <HiPlus className="mr-2 h-5 w-5" />
                            Create Event
                        </Button>
                    </Link>
                </div>

                <Card>
                    <Table>
                        <Table.Head>
                            <Table.HeadCell>Event Name</Table.HeadCell>
                            <Table.HeadCell>Date</Table.HeadCell>
                            <Table.HeadCell>Status</Table.HeadCell>
                            <Table.HeadCell>Actions</Table.HeadCell>
                        </Table.Head>
                        <Table.Body>
                            {events.map((event) => (
                                <Table.Row key={event.id}>
                                    <Table.Cell>{event.name}</Table.Cell>
                                    <Table.Cell>{event.date}</Table.Cell>
                                    <Table.Cell>
                                        <Badge color={event.status === 'active' ? 'success' : 'gray'}>
                                            {event.status}
                                        </Badge>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <div className="flex space-x-2">
                                            <Link href={route('events.show', event.id)}>
                                                <Button size="xs" gradientDuoTone="cyanToBlue">
                                                    <HiEye className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link href={route('events.edit', event.id)}>
                                                <Button size="xs" gradientDuoTone="cyanToBlue">
                                                    <HiPencil className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                            <Link
                                                href={route('events.destroy', event.id)}
                                                method="delete"
                                                as="button"
                                            >
                                                <Button size="xs" color="failure">
                                                    <HiTrash className="h-4 w-4" />
                                                </Button>
                                            </Link>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table>
                </Card>
            </div>
        </AppLayout>
    );
} 
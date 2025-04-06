import React from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Button, Card, TextInput, Select, Textarea } from 'flowbite-react';

export default function EventForm({ event = null }) {
    const { data, setData, post, put, processing, errors } = useForm({
        name: event?.name || '',
        description: event?.description || '',
        date: event?.date || '',
        status: event?.status || 'pending',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (event) {
            put(route('events.update', event.id));
        } else {
            post(route('events.store'));
        }
    };

    return (
        <AppLayout>
            <div className="max-w-2xl mx-auto">
                <Card>
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {event ? 'Edit Event' : 'Create Event'}
                    </h1>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <TextInput
                                id="name"
                                name="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Event Name"
                                required
                            />
                            {errors.name && (
                                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <Textarea
                                id="description"
                                name="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Event Description"
                                rows={4}
                            />
                            {errors.description && (
                                <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                            )}
                        </div>

                        <div>
                            <TextInput
                                id="date"
                                name="date"
                                type="date"
                                value={data.date}
                                onChange={(e) => setData('date', e.target.value)}
                                required
                            />
                            {errors.date && (
                                <p className="mt-2 text-sm text-red-600">{errors.date}</p>
                            )}
                        </div>

                        <div>
                            <Select
                                id="status"
                                name="status"
                                value={data.status}
                                onChange={(e) => setData('status', e.target.value)}
                                required
                            >
                                <option value="pending">Pending</option>
                                <option value="active">Active</option>
                                <option value="completed">Completed</option>
                            </Select>
                            {errors.status && (
                                <p className="mt-2 text-sm text-red-600">{errors.status}</p>
                            )}
                        </div>

                        <div className="flex justify-end">
                            <Button
                                type="submit"
                                gradientDuoTone="cyanToBlue"
                                disabled={processing}
                            >
                                {event ? 'Update Event' : 'Create Event'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
} 
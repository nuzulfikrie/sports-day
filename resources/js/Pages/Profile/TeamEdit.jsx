import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, TextInput } from 'flowbite-react';

export default function TeamEdit({ auth, team }) {
    const { data, setData, put, processing, errors } = useForm({
        name: team.name,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('teams.update', team.id));
    };

    return (
        <AppLayout>
            <Head title={`Edit Team: ${team.name}`} />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Team Settings</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Update your team's profile information.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="Team Name"
                                        required
                                    />
                                    {errors.name && (
                                        <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        gradientDuoTone="cyanToBlue"
                                        disabled={processing}
                                    >
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
} 
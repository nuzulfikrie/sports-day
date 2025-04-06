import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, Select } from 'flowbite-react';

export default function TeamInvitationEdit({ auth, invitation }) {
    const { data, setData, put, processing, errors } = useForm({
        role: invitation.role,
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('team-invitations.update', invitation.id));
    };

    return (
        <AppLayout>
            <Head title="Edit Team Invitation" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Edit Team Invitation</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Update this team invitation.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <Select
                                        id="role"
                                        name="role"
                                        value={data.role}
                                        onChange={(e) => setData('role', e.target.value)}
                                        required
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="member">Member</option>
                                    </Select>
                                    {errors.role && (
                                        <p className="mt-2 text-sm text-red-600">{errors.role}</p>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                        gradientDuoTone="cyanToBlue"
                                        disabled={processing}
                                    >
                                        Update
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
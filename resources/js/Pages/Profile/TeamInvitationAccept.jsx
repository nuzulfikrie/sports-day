import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button } from 'flowbite-react';

export default function TeamInvitationAccept({ auth, invitation }) {
    const { post, processing } = useForm();

    const acceptInvitation = (e) => {
        e.preventDefault();
        post(route('team-invitations.accept', invitation.id));
    };

    const rejectInvitation = (e) => {
        e.preventDefault();
        post(route('team-invitations.reject', invitation.id));
    };

    return (
        <AppLayout>
            <Head title="Team Invitation" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Team Invitation</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Accept or reject this team invitation.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="px-4 py-5 sm:p-6">
                                <p className="text-sm text-gray-600">
                                    You have been invited to join the team <span className="font-medium">{invitation.team.name}</span> as a <span className="font-medium">{invitation.role}</span>.
                                </p>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <div className="flex justify-end space-x-3">
                                    <Button
                                        color="failure"
                                        onClick={rejectInvitation}
                                        disabled={processing}
                                    >
                                        Reject
                                    </Button>
                                    <Button
                                        gradientDuoTone="cyanToBlue"
                                        onClick={acceptInvitation}
                                        disabled={processing}
                                    >
                                        Accept
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
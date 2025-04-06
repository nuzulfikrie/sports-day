import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, TextInput, Modal, Table, Alert } from 'flowbite-react';

export default function TeamShow({ auth, team }) {
    const [showInviteModal, setShowInviteModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('team-invitations.store', team.id), {
            onSuccess: () => {
                setShowInviteModal(false);
                setData('email', '');
            },
        });
    };

    const removeTeamMember = (userId) => {
        if (confirm('Are you sure you want to remove this team member?')) {
            post(route('team-members.destroy', [team.id, userId]));
        }
    };

    const leaveTeam = () => {
        if (confirm('Are you sure you want to leave this team?')) {
            post(route('team-members.destroy', [team.id, auth.user.id]));
        }
    };

    return (
        <AppLayout>
            <Head title={`Team: ${team.name}`} />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Team Settings</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Manage your team settings and team members.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-medium text-gray-900">Team Members</h4>
                                    <p className="mt-1 text-sm text-gray-600">
                                        All of the people that are part of this team.
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <Button
                                        gradientDuoTone="cyanToBlue"
                                        onClick={() => setShowInviteModal(true)}
                                    >
                                        Add Team Member
                                    </Button>
                                </div>

                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Role</Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {team.users.map((user) => (
                                            <Table.Row key={user.id}>
                                                <Table.Cell>{user.name}</Table.Cell>
                                                <Table.Cell>
                                                    {user.pivot.role}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {user.id !== auth.user.id && team.owner.id === auth.user.id && (
                                                        <Button
                                                            color="failure"
                                                            size="xs"
                                                            onClick={() => removeTeamMember(user.id)}
                                                        >
                                                            Remove
                                                        </Button>
                                                    )}
                                                    {user.id === auth.user.id && team.owner.id !== auth.user.id && (
                                                        <Button
                                                            color="failure"
                                                            size="xs"
                                                            onClick={leaveTeam}
                                                        >
                                                            Leave
                                                        </Button>
                                                    )}
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>

            <Modal
                show={showInviteModal}
                onClose={() => setShowInviteModal(false)}
            >
                <Modal.Header>Add Team Member</Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <TextInput
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="Email Address"
                                required
                            />
                            {errors.email && (
                                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                            )}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button
                                color="gray"
                                onClick={() => setShowInviteModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                gradientDuoTone="cyanToBlue"
                                disabled={processing}
                            >
                                Add
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </AppLayout>
    );
} 
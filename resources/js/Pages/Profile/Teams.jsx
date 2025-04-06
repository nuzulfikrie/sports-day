import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, TextInput, Modal, Table } from 'flowbite-react';

export default function Teams({ auth, teams }) {
    const [showTeamModal, setShowTeamModal] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('teams.store'), {
            onSuccess: () => {
                setShowTeamModal(false);
                setData('name', '');
            },
        });
    };

    const deleteTeam = (teamId) => {
        if (confirm('Are you sure you want to delete this team?')) {
            post(route('teams.destroy', teamId));
        }
    };

    return (
        <AppLayout>
            <Head title="Teams" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Teams</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Create and manage teams for your account.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="flex justify-end mb-4">
                                <Button
                                    gradientDuoTone="cyanToBlue"
                                    onClick={() => setShowTeamModal(true)}
                                >
                                    Create Team
                                </Button>
                            </div>

                            {teams.length > 0 && (
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>Name</Table.HeadCell>
                                        <Table.HeadCell>Owner</Table.HeadCell>
                                        <Table.HeadCell>Actions</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Body>
                                        {teams.map((team) => (
                                            <Table.Row key={team.id}>
                                                <Table.Cell>{team.name}</Table.Cell>
                                                <Table.Cell>
                                                    {team.owner.name}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex space-x-2">
                                                        <Button
                                                            size="xs"
                                                            href={route('teams.show', team.id)}
                                                        >
                                                            View
                                                        </Button>
                                                        {team.owner.id === auth.user.id && (
                                                            <Button
                                                                color="failure"
                                                                size="xs"
                                                                onClick={() => deleteTeam(team.id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                </Table.Cell>
                                            </Table.Row>
                                        ))}
                                    </Table.Body>
                                </Table>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            <Modal
                show={showTeamModal}
                onClose={() => setShowTeamModal(false)}
            >
                <Modal.Header>Create Team</Modal.Header>
                <Modal.Body>
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

                        <div className="flex justify-end space-x-3">
                            <Button
                                color="gray"
                                onClick={() => setShowTeamModal(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                gradientDuoTone="cyanToBlue"
                                disabled={processing}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </AppLayout>
    );
} 
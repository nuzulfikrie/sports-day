import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, TextInput, Modal, Table } from 'flowbite-react';

export default function ApiTokens({ auth, tokens }) {
    const [showTokenModal, setShowTokenModal] = useState(false);
    const [showToken, setShowToken] = useState('');
    const { data, setData, post, processing, errors } = useForm({
        name: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('api-tokens.store'), {
            onSuccess: (response) => {
                setShowToken(response.props.token);
                setShowTokenModal(true);
                setData('name', '');
            },
        });
    };

    const deleteToken = (tokenId) => {
        if (confirm('Are you sure you want to delete this token?')) {
            post(route('api-tokens.destroy', tokenId));
        }
    };

    return (
        <AppLayout>
            <Head title="API Tokens" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">API Tokens</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Create API tokens to authenticate with the API.
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
                                        placeholder="Token Name"
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
                                        Create Token
                                    </Button>
                                </div>
                            </form>

                            {tokens.length > 0 && (
                                <div className="mt-8">
                                    <Table>
                                        <Table.Head>
                                            <Table.HeadCell>Name</Table.HeadCell>
                                            <Table.HeadCell>Last Used</Table.HeadCell>
                                            <Table.HeadCell>Actions</Table.HeadCell>
                                        </Table.Head>
                                        <Table.Body>
                                            {tokens.map((token) => (
                                                <Table.Row key={token.id}>
                                                    <Table.Cell>{token.name}</Table.Cell>
                                                    <Table.Cell>
                                                        {token.last_used_at || 'Never'}
                                                    </Table.Cell>
                                                    <Table.Cell>
                                                        <Button
                                                            color="failure"
                                                            size="xs"
                                                            onClick={() => deleteToken(token.id)}
                                                        >
                                                            Delete
                                                        </Button>
                                                    </Table.Cell>
                                                </Table.Row>
                                            ))}
                                        </Table.Body>
                                    </Table>
                                </div>
                            )}
                        </Card>
                    </div>
                </div>
            </div>

            <Modal
                show={showTokenModal}
                onClose={() => setShowTokenModal(false)}
            >
                <Modal.Header>API Token Created</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-sm text-gray-600">
                            Please copy your new API token. For your security, it won't be shown again.
                        </p>
                        <div className="bg-gray-100 p-4 rounded">
                            <code className="font-mono text-sm">{showToken}</code>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        color="gray"
                        onClick={() => setShowTokenModal(false)}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </AppLayout>
    );
} 
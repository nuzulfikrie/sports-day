import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import { Card, Button, TextInput, Modal } from 'flowbite-react';

export default function DeleteAccount({ auth }) {
    const [showModal, setShowModal] = useState(false);
    const { data, setData, delete: destroy, processing, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        destroy(route('profile.destroy'));
    };

    return (
        <AppLayout>
            <Head title="Delete Account" />

            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium text-gray-900">Delete Account</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                Permanently delete your account.
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <Card>
                            <div className="px-4 py-5 sm:p-6">
                                <p className="text-sm text-gray-600">
                                    Once your account is deleted, all of its resources and data will be permanently deleted.
                                    Before deleting your account, please download any data or information that you wish to retain.
                                </p>
                            </div>

                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <Button
                                    color="failure"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete Account
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>

                <Modal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                >
                    <Modal.Header>Delete Account</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-sm text-gray-600">
                                Are you sure you want to delete your account? Once your account is deleted, all of its resources and data will be permanently deleted.
                            </p>

                            <form onSubmit={submit} className="space-y-6">
                                <div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Password"
                                        required
                                    />
                                    {errors.password && (
                                        <p className="mt-2 text-sm text-red-600">{errors.password}</p>
                                    )}
                                </div>

                                <div className="flex justify-end space-x-3">
                                    <Button
                                        color="gray"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="failure"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Delete Account
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Modal.Body>
                </Modal>
            </div>
        </AppLayout>
    );
} 
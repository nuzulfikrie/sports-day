import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import ActionMessage from '@/Components/ActionMessage';
import ActionSection from '@/Components/ActionSection';
import Checkbox from '@/Components/Checkbox';
import ConfirmationModal from '@/Components/ConfirmationModal';
import DangerButton from '@/Components/DangerButton';
import DialogModal from '@/Components/DialogModal';
import FormSection from '@/Components/FormSection';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SectionBorder from '@/Components/SectionBorder';
import TextInput from '@/Components/TextInput';

export default function ApiTokenManager({ tokens, availablePermissions, defaultPermissions }) {
    const [displayingToken, setDisplayingToken] = useState(false);
    const [managingPermissionsFor, setManagingPermissionsFor] = useState(null);
    const [apiTokenBeingDeleted, setApiTokenBeingDeleted] = useState(null);

    const createApiTokenForm = useForm({
        name: '',
        permissions: defaultPermissions,
    });

    const updateApiTokenForm = useForm({
        permissions: [],
    });

    const deleteApiTokenForm = useForm({});

    const createApiToken = () => {
        createApiTokenForm.post(route('api-tokens.store'), {
            preserveScroll: true,
            onSuccess: () => {
                setDisplayingToken(true);
                createApiTokenForm.reset();
            },
        });
    };

    const manageApiTokenPermissions = (token) => {
        updateApiTokenForm.permissions = token.abilities;
        setManagingPermissionsFor(token);
    };

    const updateApiToken = () => {
        updateApiTokenForm.put(route('api-tokens.update', managingPermissionsFor), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setManagingPermissionsFor(null),
        });
    };

    const confirmApiTokenDeletion = (token) => {
        setApiTokenBeingDeleted(token);
    };

    const deleteApiToken = () => {
        deleteApiTokenForm.delete(route('api-tokens.destroy', apiTokenBeingDeleted), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setApiTokenBeingDeleted(null),
        });
    };

    return (
        <div>
            {/* Generate API Token */}
            <FormSection onSubmit={createApiToken}>
                <FormSection.Title>Create API Token</FormSection.Title>
                <FormSection.Description>
                    API tokens allow third-party services to authenticate with our application on your behalf.
                </FormSection.Description>

                <div className="col-span-6 sm:col-span-4">
                    <InputLabel htmlFor="name" value="Name" />
                    <TextInput
                        id="name"
                        type="text"
                        className="mt-1 block w-full"
                        value={createApiTokenForm.name}
                        onChange={(e) => createApiTokenForm.setData('name', e.target.value)}
                        autoFocus
                    />
                    <InputError message={createApiTokenForm.errors.name} className="mt-2" />
                </div>

                {availablePermissions.length > 0 && (
                    <div className="col-span-6">
                        <InputLabel htmlFor="permissions" value="Permissions" />
                        <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {availablePermissions.map((permission) => (
                                <div key={permission}>
                                    <label className="flex items-center">
                                        <Checkbox
                                            checked={createApiTokenForm.permissions.includes(permission)}
                                            onChange={(e) => {
                                                const permissions = [...createApiTokenForm.permissions];
                                                if (e.target.checked) {
                                                    permissions.push(permission);
                                                } else {
                                                    const index = permissions.indexOf(permission);
                                                    if (index > -1) {
                                                        permissions.splice(index, 1);
                                                    }
                                                }
                                                createApiTokenForm.setData('permissions', permissions);
                                            }}
                                        />
                                        <span className="ms-2 text-sm text-gray-600">{permission}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <FormSection.Actions>
                    <ActionMessage on={createApiTokenForm.recentlySuccessful} className="me-3">
                        Created.
                    </ActionMessage>

                    <PrimaryButton
                        className={createApiTokenForm.processing ? 'opacity-25' : ''}
                        disabled={createApiTokenForm.processing}
                    >
                        Create
                    </PrimaryButton>
                </FormSection.Actions>
            </FormSection>

            {tokens.length > 0 && (
                <>
                    <SectionBorder />

                    <div className="mt-10 sm:mt-0">
                        <ActionSection>
                            <ActionSection.Title>Manage API Tokens</ActionSection.Title>
                            <ActionSection.Description>
                                You may delete any of your existing tokens if they are no longer needed.
                            </ActionSection.Description>

                            <ActionSection.Content>
                                <div className="space-y-6">
                                    {tokens.map((token) => (
                                        <div key={token.id} className="flex items-center justify-between">
                                            <div className="break-all">{token.name}</div>

                                            <div className="flex items-center ms-2">
                                                {token.last_used_ago && (
                                                    <div className="text-sm text-gray-400">
                                                        Last used {token.last_used_ago}
                                                    </div>
                                                )}

                                                {availablePermissions.length > 0 && (
                                                    <button
                                                        className="cursor-pointer ms-6 text-sm text-gray-400 underline"
                                                        onClick={() => manageApiTokenPermissions(token)}
                                                    >
                                                        Permissions
                                                    </button>
                                                )}

                                                <button
                                                    className="cursor-pointer ms-6 text-sm text-red-500"
                                                    onClick={() => confirmApiTokenDeletion(token)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ActionSection.Content>
                        </ActionSection>
                    </div>
                </>
            )}

            {/* Token Value Modal */}
            <DialogModal show={displayingToken} onClose={() => setDisplayingToken(false)}>
                <DialogModal.Title>API Token</DialogModal.Title>
                <DialogModal.Content>
                    <div>
                        Please copy your new API token. For your security, it won't be shown again.
                    </div>

                    {window.jetstream.flash.token && (
                        <div className="mt-4 bg-gray-100 px-4 py-2 rounded font-mono text-sm text-gray-500 break-all">
                            {window.jetstream.flash.token}
                        </div>
                    )}
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={() => setDisplayingToken(false)}>
                        Close
                    </SecondaryButton>
                </DialogModal.Footer>
            </DialogModal>

            {/* API Token Permissions Modal */}
            <DialogModal show={managingPermissionsFor !== null} onClose={() => setManagingPermissionsFor(null)}>
                <DialogModal.Title>API Token Permissions</DialogModal.Title>
                <DialogModal.Content>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {availablePermissions.map((permission) => (
                            <div key={permission}>
                                <label className="flex items-center">
                                    <Checkbox
                                        checked={updateApiTokenForm.permissions.includes(permission)}
                                        onChange={(e) => {
                                            const permissions = [...updateApiTokenForm.permissions];
                                            if (e.target.checked) {
                                                permissions.push(permission);
                                            } else {
                                                const index = permissions.indexOf(permission);
                                                if (index > -1) {
                                                    permissions.splice(index, 1);
                                                }
                                            }
                                            updateApiTokenForm.setData('permissions', permissions);
                                        }}
                                    />
                                    <span className="ms-2 text-sm text-gray-600">{permission}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </DialogModal.Content>
                <DialogModal.Footer>
                    <SecondaryButton onClick={() => setManagingPermissionsFor(null)}>
                        Cancel
                    </SecondaryButton>

                    <PrimaryButton
                        className={`ms-3 ${updateApiTokenForm.processing ? 'opacity-25' : ''}`}
                        disabled={updateApiTokenForm.processing}
                        onClick={updateApiToken}
                    >
                        Save
                    </PrimaryButton>
                </DialogModal.Footer>
            </DialogModal>

            {/* Delete Token Confirmation Modal */}
            <ConfirmationModal
                show={apiTokenBeingDeleted !== null}
                onClose={() => setApiTokenBeingDeleted(null)}
            >
                <ConfirmationModal.Title>Delete API Token</ConfirmationModal.Title>
                <ConfirmationModal.Content>
                    Are you sure you would like to delete this API token?
                </ConfirmationModal.Content>
                <ConfirmationModal.Footer>
                    <SecondaryButton onClick={() => setApiTokenBeingDeleted(null)}>
                        Cancel
                    </SecondaryButton>

                    <DangerButton
                        className={`ms-3 ${deleteApiTokenForm.processing ? 'opacity-25' : ''}`}
                        disabled={deleteApiTokenForm.processing}
                        onClick={deleteApiToken}
                    >
                        Delete
                    </DangerButton>
                </ConfirmationModal.Footer>
            </ConfirmationModal>
        </div>
    );
} 
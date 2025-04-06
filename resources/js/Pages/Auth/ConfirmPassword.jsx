import React, { useRef } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ConfirmPassword() {
    const passwordInput = useRef(null);
    const form = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('password.confirm'), {
            onFinish: () => {
                form.reset();
                passwordInput.current.focus();
            },
        });
    };

    return (
        <>
            <Head title="Secure Area" />

            <AuthenticationCard>
                <AuthenticationCard.Logo>
                    <AuthenticationCardLogo />
                </AuthenticationCard.Logo>

                <div className="mb-4 text-sm text-gray-600">
                    This is a secure area of the application. Please confirm your password before continuing.
                </div>

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            ref={passwordInput}
                            type="password"
                            className="mt-1 block w-full"
                            value={form.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            required
                            autoComplete="current-password"
                            autoFocus
                        />
                        <InputError className="mt-2" message={form.errors.password} />
                    </div>

                    <div className="flex justify-end mt-4">
                        <PrimaryButton
                            className={`ms-4 ${form.processing ? 'opacity-25' : ''}`}
                            disabled={form.processing}
                        >
                            Confirm
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
} 
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ForgotPassword({ status }) {
    const form = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <AuthenticationCard>
                <AuthenticationCard.Logo>
                    <AuthenticationCardLogo />
                </AuthenticationCard.Logo>

                <div className="mb-4 text-sm text-gray-600">
                    Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one.
                </div>

                {status && (
                    <div className="mb-4 font-medium text-sm text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit}>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={form.email}
                            onChange={(e) => form.setData('email', e.target.value)}
                            required
                            autoFocus
                            autoComplete="username"
                        />
                        <InputError className="mt-2" message={form.errors.email} />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className={form.processing ? 'opacity-25' : ''}
                            disabled={form.processing}
                        >
                            Email Password Reset Link
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
} 
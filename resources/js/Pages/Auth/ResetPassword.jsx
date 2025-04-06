import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function ResetPassword({ email, token }) {
    const form = useForm({
        token: token,
        email: email,
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.post(route('password.update'), {
            onFinish: () => form.reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Reset Password" />

            <AuthenticationCard>
                <AuthenticationCard.Logo>
                    <AuthenticationCardLogo />
                </AuthenticationCard.Logo>

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

                    <div className="mt-4">
                        <InputLabel htmlFor="password" value="Password" />
                        <TextInput
                            id="password"
                            type="password"
                            className="mt-1 block w-full"
                            value={form.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <InputError className="mt-2" message={form.errors.password} />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="password_confirmation" value="Confirm Password" />
                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            value={form.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <InputError className="mt-2" message={form.errors.password_confirmation} />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton
                            className={form.processing ? 'opacity-25' : ''}
                            disabled={form.processing}
                        >
                            Reset Password
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
} 
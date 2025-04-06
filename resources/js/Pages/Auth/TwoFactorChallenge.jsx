import React, { useRef, useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import AuthenticationCard from '@/Components/AuthenticationCard';
import AuthenticationCardLogo from '@/Components/AuthenticationCardLogo';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function TwoFactorChallenge() {
    const [recovery, setRecovery] = useState(false);
    const recoveryCodeInput = useRef(null);
    const codeInput = useRef(null);

    const form = useForm({
        code: '',
        recovery_code: '',
    });

    const toggleRecovery = async () => {
        setRecovery(!recovery);
        await new Promise(resolve => setTimeout(resolve, 0));

        if (!recovery) {
            recoveryCodeInput.current.focus();
            form.setData('code', '');
        } else {
            codeInput.current.focus();
            form.setData('recovery_code', '');
        }
    };

    const submit = (e) => {
        e.preventDefault();
        form.post(route('two-factor.login'));
    };

    return (
        <>
            <Head title="Two-factor Confirmation" />

            <AuthenticationCard>
                <AuthenticationCard.Logo>
                    <AuthenticationCardLogo />
                </AuthenticationCard.Logo>

                <div className="mb-4 text-sm text-gray-600">
                    {!recovery ? (
                        'Please confirm access to your account by entering the authentication code provided by your authenticator application.'
                    ) : (
                        'Please confirm access to your account by entering one of your emergency recovery codes.'
                    )}
                </div>

                <form onSubmit={submit}>
                    {!recovery ? (
                        <div>
                            <InputLabel htmlFor="code" value="Code" />
                            <TextInput
                                id="code"
                                ref={codeInput}
                                type="text"
                                inputMode="numeric"
                                className="mt-1 block w-full"
                                value={form.code}
                                onChange={(e) => form.setData('code', e.target.value)}
                                autoFocus
                                autoComplete="one-time-code"
                            />
                            <InputError className="mt-2" message={form.errors.code} />
                        </div>
                    ) : (
                        <div>
                            <InputLabel htmlFor="recovery_code" value="Recovery Code" />
                            <TextInput
                                id="recovery_code"
                                ref={recoveryCodeInput}
                                type="text"
                                className="mt-1 block w-full"
                                value={form.recovery_code}
                                onChange={(e) => form.setData('recovery_code', e.target.value)}
                                autoComplete="one-time-code"
                            />
                            <InputError className="mt-2" message={form.errors.recovery_code} />
                        </div>
                    )}

                    <div className="flex items-center justify-end mt-4">
                        <button
                            type="button"
                            className="text-sm text-gray-600 hover:text-gray-900 underline cursor-pointer"
                            onClick={toggleRecovery}
                        >
                            {!recovery ? 'Use a recovery code' : 'Use an authentication code'}
                        </button>

                        <PrimaryButton
                            className={`ms-4 ${form.processing ? 'opacity-25' : ''}`}
                            disabled={form.processing}
                        >
                            Log in
                        </PrimaryButton>
                    </div>
                </form>
            </AuthenticationCard>
        </>
    );
} 
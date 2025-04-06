import React, { useState } from 'react';
import { Modal, Button, TextInput } from 'flowbite-react';
import { useForm } from '@inertiajs/react';

export default function ConfirmsPassword({ onConfirm, children }) {
    const [show, setShow] = useState(false);
    const { data, setData, post, processing, errors } = useForm({
        password: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.confirm'), {
            onSuccess: () => {
                setShow(false);
                onConfirm();
            },
        });
    };

    return (
        <>
            <div onClick={() => setShow(true)}>{children}</div>

            <Modal show={show} onClose={() => setShow(false)}>
                <Modal.Header>Confirm Password</Modal.Header>
                <Modal.Body>
                    <form onSubmit={submit}>
                        <div className="mt-4">
                            <TextInput
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

                        <div className="mt-4 flex justify-end">
                            <Button
                                type="submit"
                                disabled={processing}
                            >
                                Confirm
                            </Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
} 
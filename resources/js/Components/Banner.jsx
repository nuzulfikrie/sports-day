import React, { useState } from 'react';
import { Alert } from 'flowbite-react';

export default function Banner({ style, children }) {
    const [show, setShow] = useState(true);

    if (!show) {
        return null;
    }

    return (
        <Alert
            color={style === 'success' ? 'success' : 'failure'}
            onDismiss={() => setShow(false)}
        >
            {children}
        </Alert>
    );
} 
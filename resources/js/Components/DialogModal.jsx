import React from 'react';
import { Modal } from 'flowbite-react';

export default function DialogModal({ show, onClose, title, children }) {
    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    );
} 
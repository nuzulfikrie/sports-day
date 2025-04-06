import React from 'react';
import { Modal, Button } from 'flowbite-react';

export default function ConfirmationModal({ show, onClose, title, children, footer }) {
    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header>{title}</Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            <Modal.Footer>
                {footer}
            </Modal.Footer>
        </Modal>
    );
} 
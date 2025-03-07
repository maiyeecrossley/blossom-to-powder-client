import { Modal, Button } from "react-bootstrap"
import styles from "./ModalComponent.module.css"

export default function ModalComponent({ show, handleClose, title, children }) {
    return (
        <Modal show={show} onHide={handleClose} centered className={styles.customModal}>
            <Modal.Header closeButton className={styles.modalHeader}>
                <Modal.Title className={styles.modalTitle}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body className={styles.modalBody}>{children}</Modal.Body>
            <Modal.Footer className={styles.modalFooter}>
                <Button variant="secondary" onClick={handleClose} className={styles.closeButton}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
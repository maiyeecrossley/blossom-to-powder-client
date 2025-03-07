import { Modal, Button } from "react-bootstrap"
import styles from "./ModalComponent.module.css"

export default function ModalComponent({ show, handleClose, title, children }) {
    return (
        <Modal show={show} onHide={handleClose} centered className={styles.customModal}>
            <Modal.Header closeButton>
                <Modal.Title className={styles.modalTitle}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} className={styles.closeButton}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
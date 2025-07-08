import { Dialog, DialogContent, DialogActions } from '@mui/material';
import styles from "./ModalComponent.module.css";

export default function ModalComponent({ show, handleClose, title, children }) {
    return (
        <Dialog
            open={show}
            onClose={handleClose}

        >

            <DialogContent className={styles.modalBody}>
                {children}
            </DialogContent>
            <DialogActions className={styles.modalFooter}>
                {/* <Button onClick={handleClose} className={styles.closeButton}>
                    Close
                </Button> */}
            </DialogActions>
        </Dialog>
    )
}
import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

interface AppDialogProps {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
    onSubmit?: () => void;
    submitText?: string;
    closeText?: string;
    maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
    fullWidth?: boolean;
    isSubmit?: boolean;
}

const AppDialog: React.FC<AppDialogProps> = ({
    open,
    title,
    onClose,
    onSubmit,
    submitText = "Submit",
    closeText = "Close",
    children,
    maxWidth = "sm",
    fullWidth = true,
    isSubmit = false
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
        >
            {title && <DialogTitle>{title}</DialogTitle>}

            <DialogContent>{children}</DialogContent>

            <DialogActions>
                <Button onClick={onClose}>{closeText}</Button>
                {onSubmit && (
                    <Button variant="contained" onClick={onSubmit} type={isSubmit ? 'submit' : 'button'}>
                        {submitText}
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default AppDialog;

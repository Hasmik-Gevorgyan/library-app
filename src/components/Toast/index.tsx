import * as React from 'react';
import Snackbar, { SnackbarCloseReason } from '@mui/material/Snackbar';

interface ToastProps {
  open: boolean;
  message: string;
  onClose: () => void;
}
export default function Toast({open, message, onClose}: ToastProps) {


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    onClose();
  };

  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={message}
      />
    </div>
  );
}

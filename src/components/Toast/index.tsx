import Stack from '@mui/joy/Stack';
import Snackbar from '@mui/joy/Snackbar';

type ToastProps = {
  message: string;
  onClose: () => void;
  duration?: number;
  isOpen: boolean;
};

export default function Toast({message, isOpen, duration, onClose}: ToastProps) {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center' }}>
      <Snackbar
        autoHideDuration={duration}
        open={isOpen}
        variant='outlined'
        color='success'
        onClose={onClose}
      >
        {message}
      </Snackbar>
    </Stack>
  );
}
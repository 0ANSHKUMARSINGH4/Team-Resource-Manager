import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
} from "@mui/material";

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
}) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="error" onClick={onConfirm}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

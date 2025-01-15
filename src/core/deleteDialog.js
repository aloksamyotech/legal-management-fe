import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

const DeleteConfirmationDialog = ({ open, onClose, onDelete, title, description }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || 'Are you sure you want to delete?'}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {description || 'This action cannot be undone.'}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;

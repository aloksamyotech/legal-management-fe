import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DeleteConfirmationDialog = ({ open, onClose, onDelete, title, description }) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title || t('Are you sure you want to delete?')}</DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          {description || t('This action cannot be undone.')}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t('Cancel')}
        </Button>
        <Button onClick={onDelete} color="error">
          {t('Delete')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;

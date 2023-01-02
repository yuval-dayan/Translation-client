import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({presentPopUp,setPresentPopUp,saveChangesToWordsFile}) {

  const handleCloseNoOption = () => {
    setPresentPopUp(false);
  };
  const handleCloseYesOption = () => {
    setPresentPopUp(false);
    saveChangesToWordsFile();
  };

  return (
    <div>
      <Dialog
        open={presentPopUp}
        onClose={handleCloseNoOption}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Translation Tool"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Do you want to save the changes?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNoOption}>No</Button>
          <Button onClick={handleCloseYesOption} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
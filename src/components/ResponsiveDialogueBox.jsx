import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function ResponsiveDialog( props ) {
  const [opened, setOpened] = React.useState( props.open );
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClose = (e) => {
    if (e.value == "Yes") {
        
    }
    setOpened(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={opened}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
        <strong>{"Remove Cattle From Sale?"}</strong>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <strong>Cattle will be removed form the Marketplace.</strong>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={(e) => {handleClose(e)}}>
            No
          </Button>
          <Button onClick={(e) => {handleClose(e)}} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
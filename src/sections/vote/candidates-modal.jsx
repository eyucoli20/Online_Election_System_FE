import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { Container, Typography } from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import OutlinedInput from '@mui/material/OutlinedInput';

import { useGet } from 'src/service/useGet';
import { usePost } from 'src/service/usePost';

export default function DialogSelect() {
  const [open, setOpen] = React.useState(false);

  const [selectedpPosition, setSelectedpPosition] = React.useState('');
  const [selectedpCandidate, setSelectedpCandidate] = React.useState('');

  const { data: fetchedUser, isFetching: isLoadingUser } = useGet('/api/v1/users');
  const { data: fetchedPositions, isFetching: isLoadingPositions } = useGet('/api/v1/positions');

  const handleChange = (event) => {
    setSelectedpPosition(Number(event.target.value) || '');
  };
  const handleChangeCandidate = (event) => {
    setSelectedpCandidate(Number(event.target.value) || '');
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const { mutateAsync: createCandidate, isPending: isCreatingCandidate } =
    usePost('/api/v1/candidates');

  const handleCreateCandidate = async () => {
    const transformedData = {
      positionId: selectedpPosition,
      userId: selectedpCandidate,
    };
    await createCandidate(transformedData);
  };

  const userRole = localStorage.getItem('role');

  return (
    <div>
      {userRole === 'ADMIN'?
      <Button
        onClick={handleClickOpen}
        variant="contained"
        style={{
          width: '10%',
          margin: '5px',
          padding: '10px',
          backgroundColor: 'green',
          color: 'white',
        }}
      >
        Add Candidates
      </Button> 
      :""}
      

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <Typography align="center" style={{ marginBottom: '20px' }} variant="h6" component="h2">
          Add New Candidates
        </Typography>
        <DialogContent style={{ width: 500 }}>
          <Box component="form">
            <FormControl style={{ marginBottom: '10px' }} fullWidth>
              <InputLabel id="demo-dialog-select-label">position</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedpPosition}
                onChange={handleChange}
                input={<OutlinedInput label="position" />}
              >
                <MenuItem value="">
                  <em>{isLoadingPositions ? 'loading...' : 'None'}</em>
                </MenuItem>
                {fetchedPositions?.map((position, index) => (
                  <MenuItem value={position?.id}>{position?.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="demo-dialog-select-label">candidate</InputLabel>
              <Select
                labelId="demo-dialog-select-label"
                id="demo-dialog-select"
                value={selectedpCandidate}
                onChange={handleChangeCandidate}
                input={<OutlinedInput label="candidate" />}
              >
                <MenuItem value="">
                  <em>{isLoadingUser ? 'loading...' : 'None'}</em>
                </MenuItem>
                {fetchedUser?.map((candidate, index) => (
                  <MenuItem value={candidate?.userId}>{candidate?.fullName}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Container
            style={{ display: 'flex', marginTop: '100px', justifyContent: 'space-between' }}
          >
            <Button
              onClick={handleClose}
              variant="contained"
              style={{
                width: '30%',
                margin: '5px',
                padding: '10px',
                backgroundColor: 'red',
                color: 'white',
              }}
            >
              Cancle
            </Button>
            <Button
              onClick={handleCreateCandidate}
              variant="contained"
              style={{
                width: '30%',
                margin: '5px',
                padding: '10px',
                backgroundColor: 'green',
                color: 'white',
              }}
            >
              {isCreatingCandidate ? 'ADD..' : 'ADD'}
            </Button>
          </Container>
        </DialogActions>
      </Dialog>
    </div>
  );
}

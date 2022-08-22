import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
const style = {
    display: 'flex', 
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, 0%)',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    opacity: 0.5
}
  return (
    <Box sx={ style }>
      <CircularProgress />
    </Box>
  );
}
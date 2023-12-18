import * as React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
// import SwipeableViews from 'react-swipeable-views';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Grid, Button, Container } from '@mui/material';

import { useGet } from 'src/service/useGet';

import VoteCard from '../vote-card';
import CandidateModal from '../candidates-modal';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function VotePage() {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const [positionId, setPositionId] = React.useState(1);

  const { data: positionsName, isFetching: isFetchingPosition } = useGet('/api/v1/positions');
  const { data: candidates } = useGet(`/api/v1/candidates/position/${positionId}`);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Vote sheet
      </Typography>
      <CandidateModal />
      <Box sx={{ bgcolor: 'background.paper', width: '100%' }}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="secondary"
            textColor="inherit"
            variant="fullWidth"
          >
            {isFetchingPosition ? (
              <Button loading variant="plain">
                Loading...
              </Button>
            ) : (
              ''
            )}
            {positionsName?.map((position, index) => (
              <Tab
                key={position?.id}
                label={position?.name}
                {...a11yProps(index)}
                onClick={() => setPositionId(position?.id)}
              />
            ))}
          </Tabs>
        </AppBar>

        <Container>
          <Grid container>
            {candidates?.map((candidate) => (
              <Grid
                key={candidate?.id}
                xs={12}
                style={{ display: 'flex', marginLeft: '20px' }}
                sm={6}
                md={3}
              >
                <VoteCard candidate={candidate} positionId={positionId} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </>
  );
}

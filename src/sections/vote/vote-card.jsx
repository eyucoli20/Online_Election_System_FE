/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Avatar, Button } from '@mui/material';

import { useGet } from 'src/service/useGet';
import { usePost } from 'src/service/usePost';

// ----------------------------------------------------------------------

export default function VoteCard({ candidate,positionId }) {
  const { mutateAsync: voteCandidate, isPending: isVoting } = usePost('/api/v1/votes/vote');
  
  const {
    data: fetchedMe
  } = useGet("/api/v1/users/me");


  const handleVote = async () => {
    const transformedData = {
      candidateId: candidate?.id,
      voterId: fetchedMe?.userId,
      positionId,
    };
    voteCandidate(transformedData);
  };

  return (
    <Card style={{ marginTop: '10px', backgroundColor: 'whiteSmoke' }}>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Avatar>{candidate?.user[0]}</Avatar>
        <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
          {candidate?.user}
        </Link>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <p>Position: {candidate?.position}</p>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <p>Vote Count: {candidate?.voteCount}</p>
        </Stack>
      </Stack>
      <Button
        size="md"
        variant="solid"
        style={{ width: '100%', backgroundColor: 'green' }}
        color="primary"
        onClick={handleVote}
      >
        {isVoting ? 'VOTING' : 'VOTE'}
      </Button>
    </Card>
  );
}

VoteCard.propTypes = {
  candidate: PropTypes.object,
};

import { Helmet } from 'react-helmet-async';

import { VoteView } from 'src/sections/vote/view';

// ----------------------------------------------------------------------

export default function VotePage() {
  return (
    <>
      <Helmet>
        <title> Vote List </title>
      </Helmet>

      <VoteView />
    </>
  );
}

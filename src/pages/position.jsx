import { Helmet } from 'react-helmet-async';

import { PositionView } from 'src/sections/position';

// ----------------------------------------------------------------------

export default function PositionPage() {
  return (
    <>
      <Helmet style={{marginBottom:'200px'}}>
        <title> Position </title>
      </Helmet>

      <PositionView />
    </>
  );
}

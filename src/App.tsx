import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import {
  SuspenseWithPerf,
  AuthCheck,
  preloadFirestore,
  preloadAuth,
  useFirebaseApp,
  preloadUser,
} from 'reactfire';
import Vote from './pages/Vote';

import 'firebase/auth';

const preloadSDKs = (firebaseApp: firebase.app.App) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
    }),
    preloadAuth({ firebaseApp }),
  ]);
};

const preloadData = async (firebaseApp: firebase.app.App) => {
  await preloadUser({ firebaseApp });
};

export default function App() {
  const firebaseApp = useFirebaseApp();

  preloadSDKs(firebaseApp).then(() => preloadData(firebaseApp));

  return (
    <Container maxWidth="md">
      <Box my={4}>
        <SuspenseWithPerf
          fallback={
            <div style={{ textAlign: 'center' }}>Loading albums...</div>
          }
          traceId={'load-album-status'}
        >
          <Vote></Vote>
          {/* TODO: View a list of your votes */}
          {/* <VotesList></VotesList> */}
        </SuspenseWithPerf>
      </Box>
    </Container>
  );
}

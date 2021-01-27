import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import ProTip from './ProTip';
import {
  SuspenseWithPerf,
  AuthCheck,
  preloadFirestore,
  preloadAuth,
  useFirebaseApp,
  preloadUser,
} from 'reactfire';
import Vote from './pages/Vote';
import Login from './pages/Login';

import 'firebase/auth';

const preloadSDKs = (firebaseApp: firebase.app.App) => {
  return Promise.all([
    preloadFirestore({
      firebaseApp,
      setup(firestore) {
        return firestore().enablePersistence();
      },
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
          fallback={'Loading albums...'}
          traceId={'load-album-status'}
        >
          <AuthCheck fallback={<Login></Login>}>
            <Vote></Vote>
            {/* TODO: View a list of your votes */}
          </AuthCheck>
          {/* <VotesList></VotesList> */}
        </SuspenseWithPerf>
      </Box>
    </Container>
  );
}

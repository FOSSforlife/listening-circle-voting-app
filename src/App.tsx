import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import ProTip from "./ProTip";
import { useUser, SuspenseWithPerf, AuthCheck } from "reactfire";
import Vote from "./pages/Vote";
import Login from "./pages/Login";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <SuspenseWithPerf
          fallback={"Loading albums..."}
          traceId={"load-album-status"}
        >
          <Vote></Vote>
          {/* TODO: View a list of your votes */}
          {/* <AuthCheck fallback={<Login></Login>}>
            <VotesList></VotesList>
          </AuthCheck> */}
        </SuspenseWithPerf>
      </Box>
    </Container>
  );
}

import { Box, Container, Grid, Typography, styled } from "@mui/material";
import { NavBar } from "components/NavBar";
import type { ReactNode } from "react";
import { theme } from "theme";

interface OwnProps {
  title?: string;
  children: ReactNode;
}

const Wrapper = styled(Box)({
  backgroundColor: theme.palette.secondary.main,
  minHeight: "100vh",
  paddingTop: "3vh",
  paddingBottom: "8vh",
});

export const PageView = ({ title, children }: OwnProps) => (
  <Wrapper>
    <Container maxWidth="lg">
      <Grid container display="flex" flexDirection="column">
        <Grid item alignSelf="flex-end">
          <NavBar />
        </Grid>
        <Grid item alignSelf="center">
          <Typography variant="h2" color="textPrimary" margin={5}>
            {title}
          </Typography>
        </Grid>
        <Grid item>{children}</Grid>
      </Grid>
    </Container>
  </Wrapper>
);

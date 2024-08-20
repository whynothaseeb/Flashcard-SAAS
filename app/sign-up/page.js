"use client";

import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Link,
  Paper,
} from "@mui/material";
import { SignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Header from "@/app/components/header";

export default function SignUpPage() {
  const router = useRouter();

  return (
    <> <Header />
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create an Account
        </Typography>
        <Typography variant="body1" gutterBottom align="center">
          Join us and start your journey
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <SignUp routing="hash" /> {/* Use routing="hash" if not using a catch-all route */}
        </Box>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="body2">
              Already have an account?{" "}
              <Link href="/sign-in" underline="hover">
                Sign In
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
}

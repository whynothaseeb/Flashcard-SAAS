"use client";
import React from "react";
import {
  Container,
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import { SignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link here
import Header from "@/app/components/header";

export default function SignInPage() {
  const router = useRouter();

  return (
    <> 
    <Header />
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={6} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign In
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{ mt: 3 }}
        >
          <SignIn />
        </Box>
        <Grid container justifyContent="flex-end" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="body2">
              Don't have an account?{" "}
              <Link href="/sign-up" passHref>
                Sign Up
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
    </>
  );
}

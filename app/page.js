'use client';

import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton, useUser } from "@clerk/nextjs";
import Head from "next/head";
import {
  Box,
  Container,
  AppBar,
  Button,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from "@mui/material";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  const handleSubmit = async () => {
    const checkoutSession = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: { origin: "http://localhost:3000" },
    });
    const checkoutSessionJson = await checkoutSession.json();
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJson.id,
    });
    if (error) {
      console.warn(error.message);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Flashcard SaaS</title>
        <meta
          name="description"
          content="The easiest way to create flashcards from your text."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", my: 6 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to Flashcard SaaS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            The easiest way to create flashcards from your text.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2, mr: 2 }}
            href="/generate"
          >
            Get Started
          </Button>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 4, height: "100%" }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Easy to Use
                </Typography>
                <Typography variant="body1">
                  Create flashcards effortlessly with our intuitive interface.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 4, height: "100%" }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Customizable
                </Typography>
                <Typography variant="body1">
                  Customize your flashcards with different fonts, colors, and layouts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ padding: 4, height: "100%" }}>
                <Typography variant="h6" component="h3" gutterBottom>
                  Shareable
                </Typography>
                <Typography variant="body1">
                  Easily share your flashcards with friends or students.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Free
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    $0/month
                  </Typography>
                  <Typography variant="body2" component="p">
                    Basic flashcard creation
                  </Typography>
                  <Typography variant="body2" component="p">
                    Limited storage
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Pro
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    $10/month
                  </Typography>
                  <Typography variant="body2" component="p">
                    Unlimited flashcards
                  </Typography>
                  <Typography variant="body2" component="p">
                    Advanced customization
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    fullWidth
                  >
                    Upgrade Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Enterprise
                  </Typography>
                  <Typography variant="h6" color="textSecondary">
                    Contact Us
                  </Typography>
                  <Typography variant="body2" component="p">
                    Customized solutions for large organizations
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button variant="contained" color="primary" fullWidth>
                    Contact Sales
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Footer Section */}
      <Box
        sx={{
          py: 4,
          mt: 8,
          backgroundColor: "primary.main",
          color: "white",
          textAlign: "center",
        }}
      >
        <Typography variant="body1">
          © {new Date().getFullYear()} Flashcard SaaS. All rights reserved.
        </Typography>
      </Box>
    </>
  );
}

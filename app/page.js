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
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import { AutoStories, Brush, Share, School } from '@mui/icons-material';
import Header from "./components/header";
// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
  },
});

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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Head>
        <title>Flashcard SaaS - Learn Smarter, Not Harder</title>
        <meta
          name="description"
          content="Create and study flashcards effortlessly with our AI-powered platform. Perfect for students, professionals, and lifelong learners."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Container>
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", my: 8 }}>
          <Typography variant="h1" component="h1" gutterBottom sx={{ fontSize: { xs: '2.5rem', md: '3.75rem' } }}>
            Master Any Subject with FlashMaster
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom color="text.secondary" sx={{ mb: 4 }}>
            Create AI-powered flashcards in seconds and supercharge your learning.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mr: 2 }}
            href="/generate"
          >
            Create Flashcards
          </Button>
          <Button variant="outlined" color="primary" size="large">
            Learn More
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 8 }}>
          <Typography variant="h2" component="h2" gutterBottom textAlign="center" sx={{ mb: 6 }}>
            Why Choose FlashMaster?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
                <AutoStories sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  AI-Powered Creation
                </Typography>
                <Typography variant="body1">
                  Generate flashcards from any text using advanced AI technology.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
                <Brush sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Customizable Design
                </Typography>
                <Typography variant="body1">
                  Personalize your flashcards with various themes and layouts.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
                <Share sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Easy Sharing
                </Typography>
                <Typography variant="body1">
                  Collaborate with classmates or share with students effortlessly.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper elevation={0} sx={{ p: 4, height: '100%', textAlign: 'center', backgroundColor: 'transparent' }}>
                <School sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" component="h3" gutterBottom>
                  Smart Learning
                </Typography>
                <Typography variant="body1">
                  Adaptive algorithms help you focus on what you need to learn most.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography variant="h2" component="h2" gutterBottom sx={{ mb: 6 }}>
            Choose Your Plan
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    Free
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                    $0<Typography variant="caption">/month</Typography>
                  </Typography>
                  <Typography variant="body1" component="ul" align="left" sx={{ pl: 2 }}>
                    <li>Create up to 50 flashcards</li>
                    <li>Basic customization options</li>
                    <li>Access to community templates</li>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button variant="outlined" color="primary" size="large">
                    Get Started
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={8} sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.main', borderWidth: 2, borderStyle: 'solid' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    Pro
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                    $9.99<Typography variant="caption">/month</Typography>
                  </Typography>
                  <Typography variant="body1" component="ul" align="left" sx={{ pl: 2 }}>
                    <li>Unlimited flashcards</li>
                    <li>Advanced AI-powered creation</li>
                    <li>Premium themes and layouts</li>
                    <li>Collaboration features</li>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button variant="contained" color="primary" size="large" onClick={handleSubmit}>
                    Upgrade Now
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card elevation={4} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
                    Enterprise
                  </Typography>
                  <Typography variant="h4" color="primary" sx={{ mb: 2 }}>
                    Custom
                  </Typography>
                  <Typography variant="body1" component="ul" align="left" sx={{ pl: 2 }}>
                    <li>Custom AI model training</li>
                    <li>Dedicated account manager</li>
                    <li>API access for integration</li>
                    <li>Advanced analytics and reporting</li>
                  </Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                  <Button variant="outlined" color="primary" size="large">
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
          backgroundColor: 'primary.main',
          color: 'white',
        }}
      >
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="h6" gutterBottom>
                FlashMaster
              </Typography>
              <Typography variant="body2">
                Empowering learners worldwide with AI-powered flashcards.
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
          
              
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
                Features
              </Typography>
              <Typography variant="body2" component="div">
                <ul style={{ padding: 0, listStyle: 'none' }}>
                  <li>AI-Powered Creation</li>
                  <li>Customizable Design</li>
                  <li>Easy Sharing</li>
                  <li>Smart Learning</li>
                </ul>
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" sx={{ mt: 4, textAlign: 'center' }}>
            © {new Date().getFullYear()} FlashMaster. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
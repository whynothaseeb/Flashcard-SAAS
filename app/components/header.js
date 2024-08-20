// Header.js
'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Grid } from '@mui/material';
import { Link } from 'next/link';
import { UserButton, SignedIn, SignedOut } from '@clerk/nextjs';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Container>
        <Toolbar>
          {/* Logo and Title */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            FlashMaster
          </Typography>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" component={Link} href="/" sx={{ mr: 2 }}>
              Home
            </Button>
            <Button color="inherit" component={Link} href="/generate" sx={{ mr: 2 }}>
              Create Flashcard
            </Button>
            <Button color="inherit" component={Link} href="/flashcards" sx={{ mr: 2 }}>
              My Flashcards
            </Button>

            {/* Authentication Buttons */}
            <SignedOut>
              <Button color="inherit" component={Link} href="/sign-in" sx={{ mr: 1 }}>
                Login
              </Button>
              <Button color="secondary" variant="contained" component={Link} href="/sign-up">
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;

'use client';

import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { 
  Container, 
  Grid, 
  Card, 
  CardActionArea, 
  CardContent, 
  Typography,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  CircularProgress
} from '@mui/material';
import { ArrowBack, Shuffle } from '@mui/icons-material';
import { styled } from '@mui/system';
import Header from "@/app/components/header";
const FlipCard = styled(Card)(({ theme }) => ({
  perspective: '1000px',
  '& .flipper': {
    transition: 'transform 0.6s',
    transformStyle: 'preserve-3d',
    position: 'relative',
  },
  '&.flipped .flipper': {
    transform: 'rotateY(180deg)',
  },
  '& .front, & .back': {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  '& .back': {
    transform: 'rotateY(180deg)',
  },
}));

export default function Flashcard() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcards, setFlashcards] = useState([]);
  const [flipped, setFlipped] = useState({});
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("id");

  useEffect(() => {
    async function getFlashcard() {
      if (!search || !user) return;

      try {
        const colRef = collection(doc(collection(db, "users"), user.id), "flashcardSets", search, "flashcards");
        const docsSnapshot = await getDocs(colRef);
        const flashcardsArray = [];

        docsSnapshot.forEach((doc) => {
          flashcardsArray.push({ id: doc.id, ...doc.data() });
        });

        setFlashcards(flashcardsArray);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching flashcard data:", error);
        setLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcard();
    }
  }, [search, user, isLoaded, isSignedIn]);

  const handleCardClick = (id) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
    setFlipped({});
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
    setFlipped({});
  };

  const handleShuffle = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentCardIndex(0);
    setFlipped({});
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  const currentCard = flashcards[currentCardIndex];

  return (
    <>
     <Header />
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => router.push('/flashcards')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {search} - Card {currentCardIndex + 1} of {flashcards.length}
          </Typography>
          <IconButton color="inherit" onClick={handleShuffle}>
            <Shuffle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <FlipCard 
          className={flipped[currentCard?.id] ? 'flipped' : ''}
          sx={{ height: 300, mb: 2 }}
        >
          <CardActionArea 
            onClick={() => handleCardClick(currentCard?.id)}
            sx={{ height: '100%' }}
          >
            <div className="flipper">
              <CardContent className="front" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" component="div" align="center">
                  {currentCard?.front}
                </Typography>
              </CardContent>
              <CardContent className="back" sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h5" component="div" align="center">
                  {currentCard?.back}
                </Typography>
              </CardContent>
            </div>
          </CardActionArea>
        </FlipCard>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button variant="contained" onClick={handlePrevCard}>Previous</Button>
          <Button variant="contained" onClick={handleNextCard}>Next</Button>
        </Box>
      </Container>
    </>
  );
}
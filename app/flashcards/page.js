'use client'
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { doc, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust this path as needed
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CircularProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import SchoolIcon from '@mui/icons-material/School';
import Header from "../components/header";

export default function Flashcards() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [flashcardSets, setFlashcardSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const theme = useTheme();

  useEffect(() => {
    async function getFlashcardSets() {
      if (!user) return;
      try {
        const userDocRef = doc(collection(db, "users"), user.id);
        const userDocSnap = await getDoc(userDocRef);
       
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const sets = userData.flashcardSets || [];
         
          const setsWithCards = await Promise.all(sets.map(async (set) => {
            const cardsRef = collection(userDocRef, "flashcardSets", set.name, "flashcards");
            const cardsSnap = await getDocs(cardsRef);
            const cards = cardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return { ...set, cards };
          }));
         
          setFlashcardSets(setsWithCards);
        } else {
          setFlashcardSets([]);
        }
      } catch (error) {
        console.error("Error fetching flashcard sets:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoaded && isSignedIn) {
      getFlashcardSets();
    } else if (isLoaded && !isSignedIn) {
      router.push('/sign-in');
    }
  }, [user, isLoaded, isSignedIn, router]);

  const handleCardClick = (setName, cardId) => {
    router.push(`/flashcard?id=${setName}`);
  };

  const handleCreateSet = () => {
    router.push('/generate');
  };

  if (!isLoaded || isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
     <Header />
    <Container maxWidth="lg">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <SchoolIcon sx={{ mr: 2, color: theme.palette.primary.main }} />
          Your Flashcard Sets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreateSet}
          sx={{ mt: 2 }}
        >
          Create New Set
        </Button>
      </Box>
      {flashcardSets.length === 0 ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6">You don't have any flashcard sets yet.</Typography>
          <Typography>Click the button above to create your first set!</Typography>
        </Box>
      ) : (
        flashcardSets.map((set, index) => (
          <Accordion key={index} sx={{ mb: 2, boxShadow: 2 }}>
            <AccordionSummary 
              expandIcon={<ExpandMoreIcon />}
              sx={{ 
                backgroundColor: theme.palette.primary.light,
                '&:hover': { backgroundColor: theme.palette.primary.main, color: 'white' }
              }}
            >
              <Typography variant="h6">{set.name}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                {set.cards.map((card, cardIndex) => (
                  <Grid item xs={12} sm={6} md={4} key={cardIndex}>
                    <Card 
                      sx={{ 
                        height: '100%', 
                        display: 'flex', 
                        flexDirection: 'column',
                        transition: 'transform 0.2s',
                        '&:hover': { transform: 'scale(1.05)' }
                      }}
                    >
                      <CardActionArea onClick={() => handleCardClick(set.name, card.id)} sx={{ flexGrow: 1 }}>
                        <CardContent>
                          <Typography variant="body1" color="primary" gutterBottom>Front:</Typography>
                          <Typography variant="body2" sx={{ mb: 2 }}>{card.front}</Typography>
                          <Typography variant="body1" color="secondary" gutterBottom>Back:</Typography>
                          <Typography variant="body2">{card.back}</Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </AccordionDetails>
          </Accordion>
        ))
      )}
    </Container>
    </>
  );
}
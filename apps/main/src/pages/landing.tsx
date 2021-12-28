import {
  Grid,
  Button,
  Image,
  Heading,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';
import {
  getAuth,
  signInWithRedirect,
  GoogleAuthProvider,
} from '@firebase/auth';

import firebase from '../firebase';
import logo from '../assets/alpha.png';
import { ThemeToggle } from '../components/ThemeToggle';

const googleProvider = new GoogleAuthProvider();

export function LandingPage() {
  const auth = getAuth(firebase);

  const bg = useColorModeValue('white', 'gray.900');
  const buttonBg = useColorModeValue('white', 'gray.700');
  const buttonHoverBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Grid
      h="100vh"
      direction="column"
      alignContent="center"
      justifyItems="center"
      gap={8}
      bg={bg}
    >
      <Image src={logo} alt="logo" w={256} />
      <Heading>NRTH RP</Heading>
      <Text>The best roleplaying management app</Text>
      <Button
        bg={buttonBg}
        _hover={{ bg: buttonHoverBg }}
        boxShadow="0 2px 2px 0 rgb(0 0 0 / 14%)"
        leftIcon={<FaGoogle />}
        onClick={() => signInWithRedirect(auth, googleProvider)}
      >
        Sign in with Google
      </Button>
      <Box h={10}></Box>
      <ThemeToggle />
    </Grid>
  );
}

export default LandingPage;

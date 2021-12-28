import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getAuth, getRedirectResult } from '@firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import theme from '../theme';
import firebase from '../firebase';
import { Layout } from '../layout';
import LandingPage from '../pages/landing';
import DashboardPage from '../pages/dashboard';
import CharactersPage from '../pages/characters';

const App = () => {
  const auth = getAuth(firebase);
  useEffect(() => {
    getRedirectResult(auth);
  }, [auth]);
  const [user, loading] = useAuthState(auth);

  return (
    <BrowserRouter>
      <ChakraProvider theme={theme}>
        {!loading && (
          <Layout>
            <Routes>
              <Route
                element={user ? <DashboardPage /> : <LandingPage />}
                path="/"
              />
              <Route element={<CharactersPage />} path="/characters" />
            </Routes>
          </Layout>
        )}
      </ChakraProvider>
    </BrowserRouter>
  );
};

export default App;

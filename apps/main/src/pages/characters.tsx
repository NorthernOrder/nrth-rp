import { useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Button, Divider, Grid, Heading, Icon, Link } from '@chakra-ui/react';
import { getAuth } from '@firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  CollectionReference,
} from '@firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../firebase';

interface Character {
  id?: string;
  name: string;
  userId: string;
}

export const CharactersPage = () => {
  const [user] = useAuthState(getAuth(firebase));
  const navigate = useNavigate();
  const db = getFirestore(firebase);
  const charactersCollection = collection(
    db,
    'characters'
  ) as CollectionReference<Character>;

  const [characters, loading] = useCollectionData(
    query<Character>(charactersCollection, where('userId', '==', user?.uid)),
    { idField: 'id' }
  );

  const createNewCharacter = useCallback(() => {
    return addDoc(charactersCollection, {
      name: 'New Character',
      userId: user?.uid ?? '',
    });
  }, [user, charactersCollection]);

  return (
    <Grid justifyItems="center" gap={4} mt={4}>
      <Heading>My Characters</Heading>
      <Divider w="80vw" />
      {!loading &&
        characters?.map((character) => (
          <Link
            key={character.id}
            as={RouterLink}
            to={`/character/${character.id}`}
          >
            {character.name}
          </Link>
        ))}
      <Button
        borderRadius={100}
        w={12}
        h={12}
        onClick={() =>
          createNewCharacter().then((character) =>
            navigate(`/character/${character.id}`)
          )
        }
        position="absolute"
        bottom={4}
        right={4}
      >
        <Icon as={MdAdd} fontSize={20} />
      </Button>
    </Grid>
  );
};

export default CharactersPage;

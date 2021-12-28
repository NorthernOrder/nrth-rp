import { ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Avatar,
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  Link,
  Text,
  Divider,
  Button,
  Image,
  Grid,
} from '@chakra-ui/react';
import { MdMenu, MdLogout } from 'react-icons/md';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth, signOut } from '@firebase/auth';
import firebase from './firebase';
import logo from './assets/alpha.png';

interface LayoutProps {
  children: ReactNode;
}

const Header = () => (
  <Flex direction="row" justify="center" align="center">
    <Image w={12} src={logo} mr={2} />
    <Text fontWeight="bold">NRTH RP</Text>
    <Box ml={2} w={12} />
  </Flex>
);

export const Layout = ({ children }: LayoutProps) => {
  const auth = getAuth(firebase);
  const navigate = useNavigate();
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const openDrawer = useCallback(() => {
    setDrawerOpen(true);
  }, [setDrawerOpen]);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
  }, [setDrawerOpen]);
  const goto = useCallback(
    (to: string) => {
      navigate(to);
      setDrawerOpen(false);
    },
    [navigate]
  );

  if (loading || !user) return <div>{children}</div>;

  return (
    <Flex h="100vh" direction="column">
      <Flex direction="row" justify="space-between" p="8px">
        <IconButton onClick={openDrawer} icon={<MdMenu />} aria-label="Menu" />
        <Header />
        <Box />
        <Drawer placement="left" isOpen={isDrawerOpen} onClose={closeDrawer}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader>
              <Header />
            </DrawerHeader>
            <DrawerBody>
              <Flex direction="column" mb={5}>
                <Flex direction="row" align="center" mb={4}>
                  <Avatar
                    name={user?.displayName ?? undefined}
                    src={user?.photoURL ?? undefined}
                    mr={4}
                  />
                  <Text fontWeight="bold">{user?.displayName}</Text>
                </Flex>
                <Button rightIcon={<MdLogout />} onClick={() => signOut(auth)}>
                  Sign Out
                </Button>
              </Flex>
              <Divider />
              <Grid gap={2} mt={4}>
                <Link fontWeight="bold" onClick={() => goto('/')}>
                  Home
                </Link>
                <Link fontWeight="bold" onClick={() => goto('/characters')}>
                  My Characters
                </Link>
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
      {children}
    </Flex>
  );
};

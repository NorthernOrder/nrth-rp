import {
  useColorMode,
  Switch,
  Flex,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

const SunIcon = () => {
  const sunIcon = useColorModeValue('yellow.500', 'white');
  return <Icon as={FaSun} color={sunIcon} />;
};

const MoonIcon = () => {
  const moonIcon = useColorModeValue('black', 'blue.300');
  return <Icon as={FaMoon} color={moonIcon} />;
};

export const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex justify="center" align="center">
      <SunIcon />
      <Switch
        onChange={toggleColorMode}
        isChecked={colorMode === 'dark'}
        m="0 8px"
      />
      <MoonIcon />
    </Flex>
  );
};

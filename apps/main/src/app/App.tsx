import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <ChakraProvider>
      <div>Hello</div>
    </ChakraProvider>
  </BrowserRouter>
);

export default App;

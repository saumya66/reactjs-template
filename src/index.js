import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import theme from './app/theme';
import {Provider} from 'react-redux';
import store from './app/store';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}
    <Provider store={store}>
    <ChakraProvider theme={theme}> 
        <App />
    </ChakraProvider>  
    </Provider>
    </>
);

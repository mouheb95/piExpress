import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import { ApolloProvider } from '@apollo/react-hooks'
import client from './Client'

import registerServiceWorker from './registerServiceWorker';
import './App.css';
ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'));

registerServiceWorker();

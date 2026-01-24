import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'; // Importación estándar
import { ApolloProvider } from '@apollo/client/react';
import App from './App';
import './index.css';

// Usamos HttpLink para evitar el error de "must specify a link property"
const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://127.0.0.1:8000/graphql/',
  }),
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
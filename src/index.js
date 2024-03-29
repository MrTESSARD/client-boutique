import React from "react";
import ReactDOM from "react-dom";

import { GoogleOAuthProvider } from '@react-oauth/google';
import { Provider } from "react-redux";

import { store } from "./lib/redux/reducers";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import FiltersProvider from "./context";


const client = new ApolloClient({
  // uri: 'https://flyby-router-demo.herokuapp.com/',
  // uri: "http://localhost:4002/graphqlclick/",//fonctionne en local
  // uri: "http://vps94717.serveur-vps.net:4000/graphql/",//ok
  // uri: "http://vps95240.serveur-vps.net:4000/graphql/",//ok
  // uri: "http://vps96963.serveur-vps.net:4002/graphqlclick/",//ok
  // uri: "https://tessard.site:4002/graphqlclick/",//ok
  uri: "https://tessard.store:4002/graphqlclick/",//ok

  cache: new InMemoryCache(),
});


ReactDOM.render(
  
  <GoogleOAuthProvider clientId="913129274816-1b62piol10cpr48qsml3c1dhmbm6tasn.apps.googleusercontent.com">
  {/* <React.StrictMode> */}
    <ApolloProvider client={client}>
      <FiltersProvider>
        <Provider store={store}>
        <App  />

        </Provider>
      </FiltersProvider>
    </ApolloProvider>
  {/* </React.StrictMode> */}
  </GoogleOAuthProvider>,
    
  document.getElementById("root")
);

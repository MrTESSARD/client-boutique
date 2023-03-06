import React from "react";
import ReactDOM from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import App from "./App";
import FiltersProvider from "./context";

const client = new ApolloClient({
  // uri: 'https://flyby-router-demo.herokuapp.com/',
  uri: "http://localhost:4000/graphql/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { ApolloProvider } from "react-apollo";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import client from "./apolloConfig";
import AppContainer from "./navigationConfig";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <PaperProvider>
        <AppContainer />
      </PaperProvider>
    </ApolloProvider>
  );
}

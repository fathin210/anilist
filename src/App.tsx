import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/client";
import Home from "./pages/Home";
import theme from "./theme";

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

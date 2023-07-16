import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/client";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Detail, Home } from "./pages";
import Root from "./routes/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "detail/:detailId",
        element: <Detail />
      }
    ]
  },
])

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

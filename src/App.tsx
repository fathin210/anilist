import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/client";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { CollectionDetail, CollectionList, Detail, Home } from "./pages";
import Root from "./routes/Root";
import CollectionProvider from "./provider/context";

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
      },
      {
        path: "collection-list",
        element: <CollectionList />
      },
      {
        path: "collection/:collectionId",
        element: <CollectionDetail />
      },
    ]
  },
])

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CollectionProvider>
          <RouterProvider router={router} />
        </CollectionProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

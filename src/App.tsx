import "./App.css";
import { ThemeProvider } from "@emotion/react";
import { ApolloProvider } from "@apollo/client/react";
import client from "./graphql/client";
import theme from "./theme";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/Root";
import CollectionProvider from "./provider/context";
import React, { Suspense } from "react";
import { Loader } from "./components";

const Home = React.lazy(() => import("./pages/Home"))
const Detail = React.lazy(() => import("./pages/Detail"))
const CollectionList = React.lazy(() => import("./pages/CollectionList"))
const CollectionDetail = React.lazy(() => import("./pages/CollectionDetail"))

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
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </CollectionProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;

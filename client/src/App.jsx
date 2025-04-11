/** @jsxImportSource @emotion/react */
import { Outlet, useLocation } from "react-router-dom"; // Import useLocation
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getAuthHeaders } from "./utils/auth";
import { setContext } from "@apollo/client/link/context";
import { css } from "@emotion/react";

const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  const authHeaders = getAuthHeaders();
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation(); // Get the current route
  const hideNavbarRoutes = ["/login", "/create-account"]; // Define routes where the navbar should be hidden

  const mainStyle = css`
    min-height: 50vh;
  `;

  return (
    <ApolloProvider client={client}>
      <Header />
      {/* Only show Navbar if the current path is NOT in the hideNavbarRoutes array */}
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}

      <main css={mainStyle}>
        <Outlet />
      </main>

      <Footer />
    </ApolloProvider>
  );
}

export default App;

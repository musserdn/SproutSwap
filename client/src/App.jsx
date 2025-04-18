/** @jsxImportSource @emotion/react */
import { Outlet, useLocation } from "react-router-dom";
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
import React, { useState } from "react";
import PlantContext from "./context/PlantContext";
import './App.css';

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const authHeaders = getAuthHeaders();
  return {
    headers: {
      ...headers,
      ...authHeaders,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/create-account"];

  const mainStyle = css`
    min-height: 50vh;
  `;

  // Add shared state for addedPlants
  const [addedPlants, setAddedPlants] = useState({});

  // Toggle function to update addedPlants
  const handleToggle = (plantId) => {
    setAddedPlants((prev) => ({
      ...prev,
      [plantId]: !prev[plantId],
    }));
  };

  return (
    <ApolloProvider client={client}>
      <PlantContext.Provider value={{ addedPlants, handleToggle }}>
        <Header />
        {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
        <main css={mainStyle}>
          <Outlet />
        </main>
        <Footer />
      </PlantContext.Provider>
    </ApolloProvider>
  );
}

export default App;

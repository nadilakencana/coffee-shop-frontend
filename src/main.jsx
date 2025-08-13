/**
 * Main entry point for the Coffee Shop Frontend application
 * Sets up React Router for navigation between pages
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, useOutletContext } from "react-router-dom";

import './index.css'
import App from './App.jsx'

import HomePage from './components/pages/HomePage.jsx';
import CategoryPage from './components/pages/CategoryPage.jsx';

/**
 * Wrapper component for HomePage to receive props from React Router Outlet context
 * This allows the parent App component to pass down the onCardClick handler
 */
const HomePageWrapper = () => {
  const { onCardClick } = useOutletContext();
  return <HomePage onCardClick={onCardClick} />;
};

/**
 * Wrapper component for CategoryPage to receive props from React Router Outlet context
 * This allows the parent App component to pass down the onCardClick handler
 */
const CategoryPageWrapper = () => {
  const { onCardClick } = useOutletContext();
  return <CategoryPage onCardClick={onCardClick} />;
};

/**
 * React Router configuration
 * Defines the application's routing structure with nested routes
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout component
    children: [
        {
            index: true, // Default route - renders at path "/"
            element: <HomePageWrapper />
        },
        {
            path: "category/:categoryName", // Dynamic route for category pages
            element: <CategoryPageWrapper />
        },
        // Future routes can be added here (e.g., search page, about page)
    ]
  },
]);

/**
 * Render the React application to the DOM
 * Uses React 18's createRoot API with StrictMode for development checks
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

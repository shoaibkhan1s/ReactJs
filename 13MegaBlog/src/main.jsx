import React from "react";
import ReactDOM from "react-dom/client"; // React DOM package to render the application
import App from "./App.jsx"; // Main App component import
import "./index.css"; // Global CSS file import
import { Provider } from "react-redux"; // Provider component for connecting Redux store to React app
import store from "./store/store.js"; // Redux store import
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // React Router DOM imports for routing
import { AuthLayout, Login } from "./components/index.js"; // Authentication-related components
import AddPost from "./pages/AddPost.jsx"; // Page component for adding a post
import AllPost from "./pages/AllPost.jsx"; // Page component to display all posts
import EditPost from "./pages/EditPost.jsx"; // Page component for editing a post
import Post from "./pages/Post.jsx"; // Page component to display a single post
import Home from "./pages/Home.jsx"; // Home page component
import Signup from "./pages/Signup.jsx"; // Signup page component

// BrowserRouter setup for client-side routing
const router = createBrowserRouter([
  {
    path: "/", // Root path
    element: <App />, // Main app component
    children: [
      {
        path: "/", // Home path
        element: <Home />, // Home component
      },
      {
        path: "/login", // Login path
        element: (
          <AuthLayout authentication={false}> {/* AuthLayout for non-authenticated users */}
            <Login /> {/* Login component */}
          </AuthLayout>
        ),
      },
      {
        path: "/signup", // Signup path
        element: (
          <AuthLayout authentication={false}> {/* AuthLayout for non-authenticated users */}
            <Signup /> {/* Signup component */}
          </AuthLayout>
        ),
      },
      {
        path: "/add-post", // Path to add a new post
        element: (
          <AuthLayout authentication> {/* AuthLayout for authenticated users */}
            <AddPost /> {/* AddPost component */}
          </AuthLayout>
        ),
      },
      {
        path: "/all-posts", // Path to view all posts
        element: (
          <AuthLayout authentication> {/* AuthLayout for authenticated users */}
            <AllPost /> {/* AllPost component */}
          </AuthLayout>
        ),
      },
      {
        path: "/edit-post/:slug", // Path to edit a post, slug is dynamic
        element: (
          <AuthLayout authentication> {/* AuthLayout for authenticated users */}
            <EditPost /> {/* EditPost component */}
          </AuthLayout>
        ),
      },
      {
        path: "/post/:slug", // Path to view a single post, slug is dynamic
        element: <Post />, // Post component
      },
    ],
  },
]);

// Rendering the root of the React application
ReactDOM.createRoot(document.getElementById("root")).render(
  
  <React.StrictMode> {/* StrictMode helps with identifying potential problems in the app */}
    <Provider store={store}> {/* Redux Provider wraps the app to provide the store */}
      <RouterProvider router={router} /> {/* RouterProvider enables routing in the app */}
    </Provider>
    </React.StrictMode>
    
);

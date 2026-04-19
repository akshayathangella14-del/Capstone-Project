import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";

import UserProfile from "./components/UserProfile";

import AuthorProfile from "./components/AuthorProfile";
import AuthorArticles from "./components/AuthorArticles";
import WriteArticles from "./components/WriteArticles";

import AdminProfile from "./components/AdminProfile";
import UsersList from "./components/UsersList";
import AuthorsList from "./components/AuthorsList";
import Articles from "./components/Articles";

import EditArticle from "./components/EditArticle";
import ArticleByID from "./components/ArticleByID";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";

import { Toaster } from "react-hot-toast";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        //  HOME
        {
          index: true,
          element: <Home />,
        },

        //  AUTH
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },

        //  PUBLIC ROUTES
        {
          path: "articles",
          element: <Articles />,
        },
        {
          path: "authors",
          element: <AuthorsList />,
        },

        //  USER
        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },

        //  AUTHOR
        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true, // default view
              element: <AuthorArticles />,
            },
            {
              path: "articles",
              element: <AuthorArticles />,
            },
            {
              path: "write-article",
              element: <WriteArticles />,
            },
          ],
        },

        //  ADMIN
        {
          path: "admin-profile",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true, // ✅ IMPORTANT (default page)
              element: <UsersList />, // default view
            },
            {
              path: "users",
              element: <UsersList />,
            },
            {
              path: "authors",
              element: <AuthorsList />,
            },
            {
              path: "articles",
              element: <Articles />,
            },
          ],
        },

        //  EDIT ARTICLE
        {
          path: "edit-article/:id",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },

        //  ARTICLE VIEW
        {
          path: "article/:id",
          element: <ArticleByID />,
        },

        //  UNAUTHORIZED
        {
          path: "unauthorized",
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </>
  );
}

export default App;
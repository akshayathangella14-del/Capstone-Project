import { createBrowserRouter, RouterProvider } from "react-router";
import RootLayout from "./components/RootLayout";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import UserProfile from "./components/UserProfile";
import AuthorProfile from "./components/AuthorProfile";
import AuthorArticles from "./components/AuthorArticles";
import EditArticle from "./components/EditArticle";
import WriteArticles from "./components/WriteArticles";
import ArticleByID from "./components/ArticleByID";
import Articles from "./components/Articles";
import AuthorsList from "./components/AuthorsList";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import AdminProfile from "./components/AdminProfile";
import UsersList from "./components/UsersList";

function App() {
  const routerObj = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        // HOME
        {
          index: true,
          element: <Home />,
        },

        // AUTH
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "login",
          element: <Login />,
        },

        // PUBLIC
        {
          path: "articles",
          element: <Articles />,
        },
        {
          path: "authors",
          element: <AuthorsList />,
        },

        // USER
        {
          path: "user-profile",
          element: (
            <ProtectedRoute allowedRoles={["USER"]}>
              <UserProfile />
            </ProtectedRoute>
          ),
        },

        // AUTHOR
        {
          path: "author-profile",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <AuthorProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              index: true,
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

        // ADMIN
        {
          path: "admin-profile",
          element: (
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminProfile />
            </ProtectedRoute>
          ),
          children: [
            {
              path: "authors",
              element: <AuthorsList />,
            },
            {
              path: "users",
              element: <UsersList />,
            },
            {
              path: "articles",
              element: <Articles />,
            },
          ],
        },

        // EDIT ARTICLE
        {
          path: "edit-article/:id",
          element: (
            <ProtectedRoute allowedRoles={["AUTHOR"]}>
              <EditArticle />
            </ProtectedRoute>
          ),
        },

        // ARTICLE VIEW
        {
          path: "article/:id",
          element: <ArticleByID />,
        },

        // UNAUTHORIZED
        {
          path: "unauthorized",
          element: <Unauthorized />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={routerObj} />
    </div>
  );
}

export default App;
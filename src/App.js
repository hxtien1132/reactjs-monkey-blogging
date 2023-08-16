import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import React, { Suspense } from "react";
import BlogPage from "pages/BlogPage";
import ContactPage from "pages/ContactPage";

// Import the functions you need from the SDKs you need

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

//pages
const HomePage = React.lazy(() => import("pages/HomePage")); // Lazy-loaded
const PageNotFound = React.lazy(() => import("pages/PageNotFound"));
const PostDetailsPage = React.lazy(() => import("pages/PostDetailsPage"));
const CategoryPage = React.lazy(() => import("pages/CategoryPage"));
const SignInPage = React.lazy(() => import("pages/SignInPage"));
const SignUpPage = React.lazy(() => import("pages/SignUpPage"));
const DashboardPage = React.lazy(() => import("pages/DashboardPage"));
const PageUser = React.lazy(() => import("pages/PageUser"));

//modules
const CategoryAddNew = React.lazy(() => import("module/category/CategoryAddNew"));
const CategoryManage = React.lazy(() => import("module/category/CategoryManage"));
const CategoryUpdate = React.lazy(() => import("module/category/CategoryUpdate"));
const DashboardLayout = React.lazy(() => import("module/dashboard/DashboardLayout"));
const PostAddNew = React.lazy(() => import("module/post/PostAddNew"));
const PostManage = React.lazy(() => import("module/post/PostManage"));
const PostUpdate = React.lazy(() => import("module/post/PostUpdate"));
const UserAddNew = React.lazy(() => import("module/user/UserAddNew"));
const UserManage = React.lazy(() => import("module/user/UserManage"));
const UserProfile = React.lazy(() => import("module/user/UserProfile"));
const UserUpdate = React.lazy(() => import("module/user/UserUpdate"));

function App() {
  return (
    <div>
      <AuthProvider>
        <Suspense fallback={<h1>Loading profile...</h1>}>
          <Routes>
            <Route path="/" index element={<HomePage></HomePage>}></Route>
            <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
            <Route path="/blog" element={<BlogPage></BlogPage>}></Route>
            <Route path="/contact" element={<ContactPage></ContactPage>}></Route>

            <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
            <Route path="/user/:slug" element={<PageUser></PageUser>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
            <Route path="/:slug" element={<PostDetailsPage></PostDetailsPage>}></Route>
            <Route path="/category/:slug" element={<CategoryPage></CategoryPage>}></Route>
            <Route element={<DashboardLayout></DashboardLayout>}>
              <Route path="/dashboard" element={<DashboardPage></DashboardPage>}></Route>
              <Route path="/manage/posts" element={<PostManage></PostManage>}></Route>
              <Route path="/manage/add-post" element={<PostAddNew></PostAddNew>}></Route>
              <Route
                path="/manage/update-post"
                element={<PostUpdate></PostUpdate>}
              ></Route>
              <Route
                path="/manage/category"
                element={<CategoryManage></CategoryManage>}
              ></Route>
              <Route
                path="/manage/add-category"
                element={<CategoryAddNew></CategoryAddNew>}
              ></Route>
              <Route
                path="/manage/update-category"
                element={<CategoryUpdate></CategoryUpdate>}
              ></Route>
              <Route path="/manage/user" element={<UserManage></UserManage>}></Route>
              <Route path="/manage/add-user" element={<UserAddNew></UserAddNew>}></Route>
              <Route
                path="/manage/update-user"
                element={<UserUpdate></UserUpdate>}
              ></Route>
              <Route path="/profile" element={<UserProfile></UserProfile>}></Route>
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </div>
  );
}

export default App;

import Header from "./components/js/Header";
import React, { useEffect } from "react";
import {Routes,Route,Navigate} from 'react-router-dom'
import UserBlogs from "./components/js/UserBlogs";
import Blogs from "./components/js/Blogs";
import BlogDetails from "./components/js/BlogDetails";
import AddBlog from "./components/js/AddBlog";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./store";
import SignupForm from "./components/js/SignupForm";
import LoginForm from "./components/js/LoginForm";
import Profile from "./components/js/Profile";

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      dispatch(authActions.login());
    }
  }, [dispatch]);
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/signup" element={<SignupForm  />} />
          <Route path="/login" element={<LoginForm />} />
          {isLoggedIn && (
            <React.Fragment>
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/add" element={<AddBlog />} />
              <Route path="/myBlogs" element={<UserBlogs />} />
              <Route path="/myBlogs/:id" element={<BlogDetails />} />
              <Route path="/profile" element={<Profile />}/>
            </React.Fragment>
          )}
          <Route
            path="/*"
            element={
              isLoggedIn ? (
                <Navigate to="/blogs" />
              ) : (
                <LoginForm />
              )
            }
          />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
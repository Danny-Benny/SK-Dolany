import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./home/Home";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";
import Discussions from "./discussions/Discussions";
import DiscussionsFeed from "./discussions/components/discussionsFeed";
import ResetPassword from "./components/auth/resetPassword";

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/discussions" element={<Discussions />} />
          <Route
            path="/discussions/feed/:groupId"
            element={<DiscussionsFeed />}
          />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;

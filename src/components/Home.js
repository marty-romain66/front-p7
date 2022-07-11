import React from "react";
import Card from "./post/Card";
import Header from "./Header";
import { useSelector } from "react-redux";
import AddPost from "./post/AddPost";
import SignIn from "./SignIn";
import Container from "@mui/material/Container";

const Home = () => {
  const posts = useSelector((state) => state.posts);
  const auth = useSelector((state) => state.auth.auth);
  return (
    <Container maxWidth="sm">
      {auth !== false ? (
        <>
          <Header />
          <AddPost />
          <>
            {posts.posts?.map((post) => (
              <Card post={post} />
            ))}
          </>
        </>
      ) : (
        <SignIn />
      )}
    </Container>
  );
};

export default Home;

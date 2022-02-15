import React, { useEffect, useState } from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import Axios from "axios";
import Post from "./Post";
import { useAuthState } from "../../utils/AuthContext";
import { Navigate, useNavigate } from "react-router";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { state } = useAuthState();
  const history = useNavigate();

  const getData = async () => {
    Axios.get("http://localhost:8080/posts/all/user/" + state.user.username)
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAuthStatus = async () => {
    if (!state.isAuth) {
      history("/");
    }
  };

  useEffect(() => {
    getAuthStatus();
    getData();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Text color="white" marginBlock={5} align="center" fontSize={20}>
          All my user's posts
        </Text>
        <Container
          maxW="full"
          display="flex"
          justifyContent="center"
          color="white"
        >
          <Box
            style={{
              height: "80vh",
              overflowY: "auto",
              marginBottom: "0.5rem",
            }}
          >
            {posts.length !== 0
              ? posts.map((post, index) => <Post {...post} editable={true} />)
              : "No Posts available..."}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Posts;

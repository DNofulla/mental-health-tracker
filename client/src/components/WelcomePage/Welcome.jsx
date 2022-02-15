import { Box, Container, Text } from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import Post from "../Posts/Post";

const Welcome = () => {
  const [posts, setPosts] = useState([]);

  const getData = async () => {
    Axios.get("http://localhost:8080/posts/public/global/")
      .then((res) => {
        setPosts(res.data.globalPosts);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box as="section" w="100%">
        <Text color="white" marginBlock={5} align="center" fontSize={20}>
          Global Posts
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
              ? posts.map((post, index) => <Post {...post} />)
              : "No Posts available..."}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Welcome;

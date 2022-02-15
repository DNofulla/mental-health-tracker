import React, { useState } from "react";
import { Box, Text, Badge, Divider } from "@chakra-ui/react";
import Axios from "axios";

const Post = (props) => {
  const [isPrivate, setIsPrivate] = useState(props.private);

  const toggleStatus = async () => {
    Axios.post("http://localhost:8080/posts/toggleStatus", {
      postId: props.postId,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error.message);
      });
  };

  return (
    <Box
      maxW="container.lg"
      w="container.lg"
      padding={5}
      mb={5}
      marginInline={5}
      backgroundColor="#232323"
      border="1px solid #434343"
    >
      <Text>
        By {props.firstName} {props.lastName}
        <Badge borderRadius="full" ml={2} mt={-1} px="2" colorScheme="teal">
          {props.username}
        </Badge>
        <Text float="right" align="right">
          {!props.editable ? (
            isPrivate ? (
              <Badge
                borderRadius="full"
                ml={2}
                mt={-1}
                px="2"
                colorScheme="red"
              >
                Private
              </Badge>
            ) : (
              <Badge
                borderRadius="full"
                ml={2}
                mt={-1}
                px="2"
                colorScheme="green"
              >
                Public
              </Badge>
            )
          ) : isPrivate ? (
            <Badge
              borderRadius="full"
              ml={2}
              mt={-1}
              px="2"
              colorScheme="red"
              onClick={(e) => {
                e.preventDefault();
                toggleStatus();
                setIsPrivate(!isPrivate);
              }}
            >
              Private
            </Badge>
          ) : (
            <Badge
              borderRadius="full"
              ml={2}
              mt={-1}
              px="2"
              colorScheme="green"
              onClick={(e) => {
                e.preventDefault();
                toggleStatus();
                setIsPrivate(!isPrivate);
              }}
            >
              Public
            </Badge>
          )}
        </Text>
      </Text>
      <Divider marginBlock={2} />
      <Box>
        <Text color="green.400">How are you feeling today?</Text>
        <Text ml={5} marginBlock={2}>
          {props.feelingStatus}
        </Text>
      </Box>
      <Box>
        <Text color="red.400">Did you have any suicidal thoughts today?</Text>
        <Text ml={5} marginBlock={2}>
          {props.suicidalThoughts ? "Yes, I did!" : "No, I did not!"}
        </Text>
      </Box>
      <Box>
        <Text color="purple.400">
          What are 3 things that you are grateful for today?
        </Text>
        <Text ml={5} marginBlock={2}>
          {props.gratefulFor}
        </Text>
      </Box>
      <Box>
        <Text color="blue.400">{props.date.toLocaleString()}</Text>
      </Box>
    </Box>
  );
};

export default Post;

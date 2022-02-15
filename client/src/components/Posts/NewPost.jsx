import Axios from "axios";
import React, { useState } from "react";
import { useAuthState } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
import {
  Badge,
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Radio,
  RadioGroup,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";

const NewPost = () => {
  const [feelingStatus, setFeelingStatus] = useState("");
  const [suicidalThoughts, setSuicidalThoughts] = useState("false");
  const [gratefulFor, setGratefulFor] = useState("");
  const [privateStatus, setPrivateStatus] = useState("private");

  const history = useNavigate();
  const { state, setState } = useAuthState();

  const clearFields = () => {
    setFeelingStatus("");
    setSuicidalThoughts("false");
    setGratefulFor("");
    setPrivateStatus("private");
  };

  const postData = async () => {
    Axios.post("http://localhost:8080/posts/new", {
      firstName: state.user.firstName,
      lastName: state.user.lastName,
      username: state.user.username,
      feelingStatus: feelingStatus,
      suicidalThoughts: suicidalThoughts === "true" ? true : false,
      gratefulFor: gratefulFor,
      private: privateStatus === "private" ? true : false,
    }).then((response) => {
      console.log(response);
      if (response.message) {
        history("/");
      }

      history("/posts");
    });
  };

  return (
    <>
      <Box as="section" w="100%">
        <Container maxW="full" color="white">
          <Box
            style={{
              height: "80vh",
              marginBottom: "0.5rem",
            }}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
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
                {state.user.firstName} {state.user.lastName}
                <Badge
                  borderRadius="full"
                  ml={2}
                  mt={-1}
                  px="2"
                  colorScheme="teal"
                >
                  {state.user.username}
                </Badge>
                <Text float="right" align="right">
                  <Badge
                    borderRadius="full"
                    float="right"
                    align="right"
                    mt={0}
                    px="2"
                    colorScheme="gray"
                  >
                    New Journal Entry
                  </Badge>{" "}
                </Text>
              </Text>
              <Divider marginBlock={2} />
              <Box>
                <Text color="green.400">How are you feeling today?</Text>
                <Textarea
                  w={"95%"}
                  marginInline={"2.5%"}
                  mt={2}
                  placeholder="How are you feeling today?"
                  resize={"none"}
                  borderRadius={1}
                  borderColor={"green.300"}
                  defaultValue={feelingStatus}
                  value={feelingStatus}
                  onChange={(e) => {
                    e.preventDefault();
                    setFeelingStatus(e.target.value);
                  }}
                />
              </Box>

              <Box mt={2}>
                <Text color="blue.300">
                  Did you have any suicidal thoughts today?
                </Text>
                <RadioGroup
                  defaultValue={suicidalThoughts}
                  value={suicidalThoughts}
                  onChange={setSuicidalThoughts}
                  mb={6}
                  colorScheme="blue"
                >
                  <Stack direction="row" spacing={6} ml={6} mt={2}>
                    <Radio value="false">No</Radio>
                    <Radio value="true">Yes</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Box>
                <Text color="purple.400">
                  What are 3 things you are grateful for today? (Minimum 100
                  characters)
                </Text>
                <Textarea
                  w={"95%"}
                  marginInline={"2.5%"}
                  marginBlock={2}
                  placeholder="What are 3 things you grateful for today?"
                  resize={"none"}
                  borderRadius={1}
                  borderColor={"purple.300"}
                  defaultValue={gratefulFor}
                  value={gratefulFor}
                  onChange={(e) => {
                    e.preventDefault();
                    setGratefulFor(e.target.value);
                  }}
                />
              </Box>
              <Box mt={2}>
                <Text color="red.400">
                  Should this post be made private or public?
                </Text>
                <RadioGroup
                  defaultValue={privateStatus}
                  value={privateStatus}
                  onChange={setPrivateStatus}
                  mb={6}
                  colorScheme="red"
                >
                  <Stack direction="row" spacing={6} ml={6} mt={2}>
                    <Radio value="private">Private</Radio>
                    <Radio value="public">Public</Radio>
                  </Stack>
                </RadioGroup>
              </Box>
              <Divider mb={4} />
              <Flex justifyContent="space-evenly">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    clearFields();
                  }}
                  colorScheme={"red"}
                  maxW={60}
                >
                  Clear Fields
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    postData();
                  }}
                  colorScheme={"green"}
                  maxW={60}
                >
                  Create Post
                </Button>
              </Flex>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NewPost;

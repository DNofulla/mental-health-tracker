import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const { register } = useAuth();
  const history = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    await register(
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      history,
    );

    setFirstName("");
    setLastName("");
    setUsername("");
    setPhoneNumber("");
    setPassword("");
  };

  return (
    <>
      <Box as="section" w="100%">
        <Container
          display="flex"
          justifyContent="center"
          alignItems="center"
          h="calc(94vh - 1px)"
          minH="calc(85vh - 1px)"
        >
          <form
            style={{
              padding: 20,
              width: "100%",
            }}
            onSubmit={(e) => onSubmit(e)}
          >
            <FormControl isRequired>
              <FormLabel color="white" htmlFor="firstName">
                First Name
              </FormLabel>
              <Input
                color="white"
                placeholder="First Name"
                id="firstName"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={firstName}
                onChange={(e) => {
                  e.preventDefault();
                  setFirstName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="lastName">
                Last Name
              </FormLabel>
              <Input
                color="white"
                placeholder="Last Name"
                id="lastName"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={lastName}
                onChange={(e) => {
                  e.preventDefault();
                  setLastName(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="phoneNumber">
                Username
              </FormLabel>
              <Input
                color="white"
                placeholder="Username"
                id="username"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={username}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="phoneNumber">
                Phone Number
              </FormLabel>
              <Input
                color="white"
                placeholder="Phone Number"
                id="phoneNumber"
                type="text"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={phoneNumber}
                onChange={(e) => {
                  e.preventDefault();
                  setPhoneNumber(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="password">
                Password
              </FormLabel>
              <Input
                color="white"
                placeholder="Password"
                id="password"
                type="password"
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
              />
            </FormControl>

            <FormControl mt={5}>
              <Input
                color="white"
                focusBorderColor="red"
                type="submit"
                value="Sign up"
                style={{ cursor: "pointer" }}
                backgroundColor="#121344"
                border="none"
              />
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Signup;

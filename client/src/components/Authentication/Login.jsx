import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth, useAuthState } from "../../utils/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useNavigate();

  const { login } = useAuth();
  const { state, setState } = useAuthState();

  const onSubmit = async (e) => {
    e.preventDefault();
    await login(username, password, history, setState);
    setUsername("");
    setPassword("");
  };

  return !state.isAuth ? (
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
              <FormLabel color="white" htmlFor="phoneNumber">
                Username
              </FormLabel>
              <Input
                color="white"
                focusBorderColor="red"
                placeholder="Username"
                id="username"
                type="text"
                value={username}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
              />
            </FormControl>
            <FormControl mt={3} isRequired>
              <FormLabel color="white" htmlFor="password">
                Password
              </FormLabel>
              <Input
                color="white"
                focusBorderColor="red"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  e.preventDefault();
                  setPassword(e.target.value);
                }}
                backgroundColor="#323232"
                letterSpacing={2}
                border="none"
              />
            </FormControl>
            <FormControl mt={5}>
              <Input
                color="white"
                focusBorderColor="red"
                type="submit"
                value="Login"
                style={{ cursor: "pointer" }}
                backgroundColor="#121344"
                border="none"
              />
            </FormControl>
          </form>
        </Container>
      </Box>
    </>
  ) : (
    <Navigate replace to="/" />
  );
};

export default Login;

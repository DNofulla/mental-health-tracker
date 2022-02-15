import {
  Box,
  Container,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuthState } from "../../utils/AuthContext";

const PhoneVerification = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { state, setState } = useAuthState();
  const history = useNavigate();
  const toast = useToast();

  const generateCode = async () => {
    Axios.post("http://localhost:8080/users/accountVerify/new", {
      phoneNumber: state.user.phoneNumber,
      username: state.user.username,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    generateCode();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    Axios.post("http://localhost:8080/users/verify", {
      verificationCode,
      username: state.user.username,
    })
      .then((response) => {
        console.log(response);
        setState({ isAuth: true, user: { ...state.user, verified: true } });
        toast({
          title: "Number Verified!",
          description:
            "We have verified the phone number for your account! Feel free to keep using your account like normal now!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        history("/");
      })
      .catch((error) => {
        console.log(error.message);
        history("/");
      });

    history("/");
  };

  return state.isAuth ? (
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
              <FormLabel color="white" htmlFor="verificationCode">
                Verification Code
              </FormLabel>
              <Input
                color="white"
                focusBorderColor="red"
                placeholder="Verification Code"
                id="verificationCode"
                type="text"
                value={verificationCode}
                onChange={(e) => {
                  e.preventDefault();
                  setVerificationCode(e.target.value);
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
                value="Verify my code!"
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

export default PhoneVerification;

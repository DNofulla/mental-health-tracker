import React from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
} from "@chakra-ui/react";

import { ExternalLinkIcon, HamburgerIcon } from "@chakra-ui/icons";
import { IoLogoGithub } from "react-icons/io5";
import { useAuthState, useAuth } from "../../utils/AuthContext";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const NavBar = () => {
  const { state, setState } = useAuthState();
  const { logout } = useAuth();
  const history = useNavigate();

  return (
    <Box
      as="nav"
      w="100%"
      zIndex={1}
      borderBottom="1px solid #ccc"
      minH="6vh"
      maxHeight="15vh"
      color="white"
    >
      <Container
        display="flex"
        p={2}
        maxW="container.xl"
        wrap="wrap"
        align="center"
        justify="space-between"
      >
        <Flex align="center" mr={3}>
          <Link to="/">
            <Heading as="h1" size="lg" letterSpacing={"tighter"}>
              Mental Health Tracker
            </Heading>
          </Link>
        </Flex>

        <Stack
          direction={{ base: "column", md: "row" }}
          display={{ base: "none", md: "flex" }}
          width={{ base: "full", md: "auto" }}
          alignItems="center"
          flexGrow={1}
          mt={{ base: 4, md: 2 }}
        >
          {state.isAuth ? (
            <Link pt={2} pl={2} to="/posts">
              Posts
            </Link>
          ) : null}

          <a
            target="_blank"
            href="https://github.com/DNofulla/mental-health-tracker"
            rel="noreferrer"
            style={{ gap: 4, display: "inline-flex", alignItems: "center" }}
            pt={2}
            pl={2}
          >
            <IoLogoGithub />
            Source
          </a>
          <a
            href="https://www.cdc.gov/mentalhealth/tools-resources/individuals/index.htm"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLinkIcon /> Get Help!
          </a>
          {state.isAuth ? (
            <Link
              to="/posts/new"
              display="inline-flex"
              alignItems="center"
              style={{ gap: 4 }}
              pl={2}
            >
              <Button colorScheme={"green"}>&#65291; New Post</Button>
            </Link>
          ) : null}
        </Stack>

        <Box flex={1} align="right">
          <Stack
            direction={{ base: "column", md: "row" }}
            display={{ base: "none", md: "contents" }}
            width={{ base: "full", md: "auto" }}
            alignItems="center"
            flexGrow={1}
            mt={{ base: 4, md: 0 }}
          >
            {!state.isAuth ? (
              <>
                <Link pt={2} pl={2} to="/login">
                  <Button colorScheme="blue">Login</Button>
                </Link>
                <Link style={{ gap: 4 }} to="/signup" pt={2} pl={2}>
                  <Button colorScheme="purple">Sign Up</Button>
                </Link>{" "}
              </>
            ) : (
              <>
                <Link to="/">
                  <Button
                    colorScheme="red"
                    onClick={(e) => {
                      e.preventDefault();
                      logout(history, setState);
                    }}
                    mt={2}
                  >
                    Log out
                  </Button>
                </Link>
              </>
            )}
          </Stack>
          <Box ml={2} display={{ base: "inline-block", md: "none" }}>
            <Menu isLazy id="navbar-menu" colorScheme="red">
              <MenuButton
                as={IconButton}
                icon={<HamburgerIcon />}
                variant="outline"
                aria-label="Options"
                color="whiteAlpha.900"
                _hover={{ backgroundColor: "#121212" }}
                _focus={{ backgroundColor: "#121212" }}
                _active={{ backgroundColor: "#121212" }}
              />
              <MenuList
                style={{
                  background: "#121212",
                  border: "1px solid #fff",
                }}
              >
                <MenuItem
                  _hover={{ background: "#323232" }}
                  _focus={{ backgroundColor: "#323232" }}
                  _active={{ backgroundColor: "#323232" }}
                  color="white"
                  as={Link}
                  to="/posts"
                >
                  Posts
                </MenuItem>

                <a
                  href="https://github.com/DNofulla/mental-health-tracker"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MenuItem
                    _hover={{ background: "#323232" }}
                    _focus={{ backgroundColor: "#323232" }}
                    _active={{ backgroundColor: "#323232" }}
                    color="white"
                  >
                    <IoLogoGithub />
                    Source
                  </MenuItem>
                </a>

                <a
                  href="https://www.cdc.gov/mentalhealth/tools-resources/individuals/index.htm"
                  target="_blank"
                  rel="noreferrer"
                >
                  <MenuItem
                    _hover={{ background: "#323232" }}
                    _focus={{ backgroundColor: "#323232" }}
                    _active={{ backgroundColor: "#323232" }}
                    color="white"
                  >
                    <ExternalLinkIcon />
                    Get Help!
                  </MenuItem>
                </a>

                {!state.isAuth ? (
                  <>
                    {" "}
                    <MenuItem
                      _hover={{ background: "#323232" }}
                      _focus={{ backgroundColor: "#323232" }}
                      _active={{ backgroundColor: "#323232" }}
                      color="white"
                      as={Link}
                      to="/login"
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      _hover={{ background: "#323232" }}
                      _focus={{ backgroundColor: "#323232" }}
                      _active={{ backgroundColor: "#323232" }}
                      color="white"
                      to="/signup"
                      as={Link}
                    >
                      Sign Up
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      _hover={{ background: "#323232" }}
                      _focus={{ backgroundColor: "#323232" }}
                      _active={{ backgroundColor: "#323232" }}
                      color="white"
                      as={Link}
                      to="https://github.com/DNofulla/mental-health-tracker"
                    >
                      &#65291; New Post
                    </MenuItem>
                    <MenuItem
                      _hover={{ background: "#323232" }}
                      _focus={{ backgroundColor: "#323232" }}
                      _active={{ backgroundColor: "#323232" }}
                      color="white"
                      to="/"
                      as={Link}
                      onClick={(e) => {
                        e.preventDefault();
                        logout(history, setState);
                      }}
                    >
                      Log out
                    </MenuItem>
                  </>
                )}
              </MenuList>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default NavBar;

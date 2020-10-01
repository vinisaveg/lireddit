import { Box, Button, Flex, Link } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";
import NextLink from "next/link";
import { useMeQuery } from "../generated/graphql";

export const NavBar: FunctionComponent = () => {
  const [{ data, fetching }] = useMeQuery();

  let body;

  if (fetching) {
    body = null;
  }

  if (!data?.me) {
    body = (
      <>
        <NextLink href="/login">
          <Link m="3" color="white">
            login
          </Link>
        </NextLink>

        <NextLink href="/register">
          <Link m="3" color="white">
            register
          </Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <Flex>
        <Box mr="4">{data.me.username}</Box>
        <Button variant="link">logout</Button>
      </Flex>
    );
  }

  return (
    <Flex bg="tomato" w="100%">
      <Box p={4} ml="auto">
        {body}
      </Box>
    </Flex>
  );
};

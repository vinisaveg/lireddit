import { Box } from "@chakra-ui/core";
import React, { FunctionComponent } from "react";
import { NavBar } from "../components/NavBar";

const Index: FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <Box>
        <span>Hello World!</span>
      </Box>
    </>
  );
};

export default Index;

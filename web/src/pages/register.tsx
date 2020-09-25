import React, { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { FormControl, FormLabel, Input } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";

const Register: FunctionComponent = () => {
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values, handleChange }) => (
          <FormControl>
            <FormLabel htmlFor="username">Username</FormLabel>
            <Input
              id="username"
              placeholder="name"
              value={values.username}
              onChange={handleChange}
            />
          </FormControl>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

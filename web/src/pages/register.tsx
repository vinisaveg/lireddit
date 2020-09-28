import React, { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Button, FormControl } from "@chakra-ui/core";
import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useMutation } from "urql";

const REGISTER_MUTATION = `
  mutation register($username: String, $password: String) {
    register (options: {username: $username, password: $password}) {
      errors {
        field
        name
      }
      user {
        id
        username
      }
    }
  }
`;

const Register: FunctionComponent = () => {
  const [{}, register] = useMutation(REGISTER_MUTATION);

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={(values) => {
          console.log(values);
          register(values);
        }}
      >
        {({ values, handleChange, isSubmitting }) => (
          <Form>
            <FormControl>
              <InputField
                name="username"
                placeholder="username"
                label="Username"
              />

              <InputField
                label="Password"
                name="password"
                placeholder="password"
                type="password"
              />

              <Button
                mt={4}
                type="submit"
                variantColor="teal"
                isLoading={isSubmitting}
              >
                Register
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;

import React, { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Button, FormControl } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Login: FunctionComponent = () => {
  const router = useRouter();
  const [{}, login] = useLoginMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login({ options: values });

          if (response.data?.login.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login.user) {
            router.push("/");
          }
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
                Login
              </Button>
            </FormControl>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Login;

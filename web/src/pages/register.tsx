import React, { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import { Button, FormControl } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";

const Register: FunctionComponent = () => {
  const router = useRouter();
  const [{}, register] = useRegisterMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);

          if (response.data?.register.errors) {
            setErrors(toErrorMap(response.data.register.errors));
          } else if (response.data?.register.user) {
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

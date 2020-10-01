import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/core";
import { useField } from "formik";
import React, { FunctionComponent } from "react";
import { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  placeholder: string;
};

export const InputField: FunctionComponent<InputFieldProps> = ({
  label,
  size,
  ...props
}) => {
  const [field, { error }] = useField(props);

  return (
    <FormControl mt={4} isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...props}
        {...field}
        id={field.name}
        placeholder={props.placeholder}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

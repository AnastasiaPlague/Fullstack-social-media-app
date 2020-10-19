import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Form, Header, Input, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Register = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function registerUser() {
    addUser();
  }

  return (
    <Form noValidate loading={loading} onSubmit={onSubmit}>
      <Header as="h1">Register Page</Header>
      <Form.Field
        required
        control={Input}
        label="Username"
        placeholder="Username"
        name="username"
        type="text"
        error={errors.username || false}
        onChange={onChange}
        value={values.username}
      />
      <Form.Field
        required
        control={Input}
        label="Email"
        placeholder="Email"
        name="email"
        type="email"
        error={errors.email || false}
        onChange={onChange}
        value={values.email}
      />
      <Form.Field
        required
        control={Input}
        label="Password"
        placeholder="Password"
        name="password"
        type="password"
        onChange={onChange}
        error={errors.password || false}
        value={values.password}
      />
      <Form.Field
        required
        control={Input}
        label="Confirm password"
        placeholder="Confirm password"
        name="confirmPassword"
        type="password"
        error={errors.confirmPassword || false}
        onChange={onChange}
        value={values.confirmPassword}
      />
      <Form.Button content="Register" primary style={{ marginTop: "1rem" }} />
      {Object.keys(errors).length > 0 && (
        <Message negative>
          <p>Fill in all fileds to complete registration</p>
        </Message>
      )}
    </Form>
  );
};

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Register;

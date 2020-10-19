import React, { useState, useContext } from "react";
import gql from "graphql-tag";
import { Form, Header, Input, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { useForm } from "../utils/hooks";
import { AuthContext } from "../context/auth";

const Login = () => {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  const { onChange, onSubmit, values } = useForm(loginCallback, {
    username: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values,
  });

  function loginCallback() {
    loginUser();
  }

  return (
    <div className="">
      <Form noValidate loading={loading} onSubmit={onSubmit}>
        <Header as="h1">Login Page</Header>
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
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          onChange={onChange}
          error={errors.password || false}
          value={values.password}
        />
        <Form.Button content="Log in" primary style={{ marginTop: "1rem" }} />
      </Form>
      {Object.keys(errors).length > 0 && (
        <Message negative>
          <p>Fill in all fileds to complete registration</p>
        </Message>
      )}
    </div>
  );
};

const LOGIN_USER = gql`
  mutation register($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;

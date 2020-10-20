import React from "react";
import { Form, Header } from "semantic-ui-react";
import gql from "graphql-tag";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import { useMutation } from "@apollo/client";
import { useForm } from "../utils/hooks";

const PostForm = () => {
  const { onChange, onSubmit, values } = useForm(createPostCallback, {
    body: "",
  });

  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      //seraching in cache for an already sent request
      const data = proxy.readQuery({ query: FETCH_POSTS_QUERY });
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: [result.data.createPost, ...data.getPosts],
        },
      });
      values.body = "";
    },
    onError(err) {
      console.log(err);
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <Header as="h1">Create a post:</Header>
      <Form.Input
        placeholder="Hi World!"
        name="body"
        type="text"
        onChange={onChange}
        error={error?.graphQLErrors[0].message || false}
        value={values.body}
      />
      <Form.Button content="Submit" color="teal" />
    </Form>
  );
};

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      comments {
        id
        body
        username
        createdAt
      }
      likes {
        id
        username
        createdAt
      }
      likeCount
      commentCount
    }
  }
`;

export default PostForm;

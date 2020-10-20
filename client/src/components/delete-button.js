import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy, result) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      });
      const newData = [...data.getPosts].filter((p) => p.id !== postId);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          getPosts: newData,
        },
      });
      if (callback) {
        callback();
      }
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId },
  });
  return (
    <>
      <Button
        as="div"
        color="red"
        icon="trash"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      />
      <Confirm
        content="Are you sure you want to delete the post?"
        open={confirmOpen}
        confirmButton="Yes"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default DeleteButton;

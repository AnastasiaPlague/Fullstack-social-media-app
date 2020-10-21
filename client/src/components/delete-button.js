import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import { Button, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import MyPopup from "./my-popup";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deleteContent] = useMutation(mutation, {
    update(proxy, result) {
      setConfirmOpen(false);
      if (!commentId) {
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
      }
      if (callback) {
        callback();
      }
    },
    onError(err) {
      console.log(err);
    },
    variables: { postId, commentId },
  });
  return (
    <>
      <MyPopup content={`${commentId ? "Delete comment" : "Delete post"}`}>
        <Button
          as="div"
          color="red"
          icon="trash"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        />
      </MyPopup>
      <Confirm
        content="Are you sure you want to delete the post?"
        open={confirmOpen}
        confirmButton="Yes"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteContent}
      />
    </>
  );
};

const DELETE_POST = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton;

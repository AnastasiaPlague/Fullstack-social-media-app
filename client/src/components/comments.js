import React from "react";
import { Card } from "semantic-ui-react";
import moment from "moment";
import DeleteButton from "./delete-button";

const Comments = ({ comments = [], username = "", postId }) => {
  return (
    <>
      {comments.map((comment) => (
        <Card fluid key={comment.id}>
          <Card.Content>
            {username === comment.username && (
              <DeleteButton postId={postId} commentId={comment.id} />
            )}
            <Card.Header>{comment.username}</Card.Header>
            <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>
            <Card.Description>{comment.body}</Card.Description>
          </Card.Content>
        </Card>
      ))}
    </>
  );
};

export default Comments;

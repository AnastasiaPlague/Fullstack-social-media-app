import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import MyPopup from "./my-popup";

const CommentsButton = ({ post: { commentCount, id } }) => {
  return (
    <MyPopup content="Comment on post">
      <Button as={Link} to={`/posts/${id}`} labelPosition="right" size="small">
        <Button color="blue" basic>
          <Icon name="comments" />
        </Button>
        <Label basic color="blue" pointing="left">
          {commentCount}
        </Label>
      </Button>
    </MyPopup>
  );
};

export default CommentsButton;

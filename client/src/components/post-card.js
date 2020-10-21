import React, { useContext } from "react";
import { Card, Image } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth";
import LikeButton from "./like-button";
import CommentsButton from "./comments-button";
import DeleteButton from "./delete-button";

const PostCard = ({
  post: { id, body, createdAt, username, likeCount, likes, commentCount },
}) => {
  const { user } = useContext(AuthContext);

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            rounded={true}
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
          />
          <Card.Header>{username}</Card.Header>
          <Card.Meta as={Link} to={`/posts/${id}`}>
            {moment(createdAt).fromNow()}
          </Card.Meta>
          <Card.Description>{body}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <LikeButton user={user} post={{ id, likes, likeCount }} />
          <CommentsButton post={{ commentCount, id }} />
          {user?.username === username && <DeleteButton postId={id} />}
        </Card.Content>
      </Card>
    </Card.Group>
  );
};

export default PostCard;

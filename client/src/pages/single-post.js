import React, { useContext } from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import moment from "moment";
import Spinner from "../components/spinner";
import { Card, Grid, Image } from "semantic-ui-react";
import LikeButton from "../components/like-button";
import CommentsButton from "../components/comments-button";
import DeleteButton from "../components/delete-button";

const SinglePost = (props) => {
  const postId = props.match.params.postId;

  const { data: { getPost } = {} } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  function deletePostCallback() {
    props.history.push("/");
  }

  const { user } = useContext(AuthContext);

  let postMarkup;
  if (!getPost) {
    postMarkup = <Spinner />;
  } else {
    const {
      id,
      body,
      createdAt,
      username,
      comments,
      likes,
      likeCount,
      commentCount,
    } = getPost;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              floated="right"
              size="small"
              rounded={true}
              src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Card fluid>
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
                <Card.Description>{body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <LikeButton user={user} post={{ id, likes, likeCount }} />
                <CommentsButton post={{ commentCount, id }} />
                {user?.username === username && (
                  <DeleteButton postId={postId} callback={deletePostCallback} />
                )}
              </Card.Content>
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div className="">{postMarkup}</div>;
};

const FETCH_POST = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;

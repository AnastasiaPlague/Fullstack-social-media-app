import React, { useContext, useRef, useState } from "react";
import gql from "graphql-tag";
import { useMutation, useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import moment from "moment";
import Spinner from "../components/spinner";
import { Card, Form, Grid, Image, Header } from "semantic-ui-react";
import LikeButton from "../components/like-button";
import CommentsButton from "../components/comments-button";
import DeleteButton from "../components/delete-button";
import Comments from "../components/comments";

const SinglePost = (props) => {
  const [comment, setComment] = useState("");
  const postId = props.match.params.postId;
  const commentInputRef = useRef(null);

  const { data: { getPost } = {} } = useQuery(FETCH_POST, {
    variables: {
      postId,
    },
  });

  const [submitComment] = useMutation(SUBMIT_COMMENT, {
    update() {
      setComment("");
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
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
      <Grid centered stackable>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
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
            {user && (
              <Card fluid>
                <Card.Content>
                  <Form>
                    <Header as="h2">Post comment:</Header>
                    <div className="ui action input fluid">
                      <input
                        ref={commentInputRef}
                        type="text"
                        placeholder="Type your comment here"
                        name="comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="ui button teal"
                        disabled={comment.trim() === ""}
                        onClick={submitComment}
                      >
                        Submit
                      </button>
                    </div>
                  </Form>
                </Card.Content>
              </Card>
            )}
            <Comments
              postId={postId}
              comments={comments}
              username={user?.username}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return <div className="">{postMarkup}</div>;
};

const SUBMIT_COMMENT = gql`
  mutation($postId: ID!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

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

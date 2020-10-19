import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid, Header } from "semantic-ui-react";
import PostCard from "../components/postcard";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div className="">
      <Header as="h1" textAlign="center">
        Recent Posts
      </Header>
      <Grid columns={3}>
        {loading ? (
          <h1>Loading posts</h1>
        ) : (
          <Grid.Row>
            {data.getPosts &&
              data.getPosts.map((post) => {
                console.log(post);
                return (
                  <Grid.Column key={post.id} style={{ marginBotom: "20px" }}>
                    <PostCard post={post} />
                  </Grid.Column>
                );
              })}
          </Grid.Row>
        )}
      </Grid>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      comments {
        id
        username
        body
      }
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
    }
  }
`;

export default Home;

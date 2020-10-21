import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { AuthContext } from "../context/auth";
import { FETCH_POSTS_QUERY } from "../utils/graphql";
import {
  Container,
  Grid,
  Header,
  Transition,
  Divider,
} from "semantic-ui-react";
import PostCard from "../components/post-card";
import PostForm from "../components/post-form";
import Spinner from "../components/spinner";

const Home = () => {
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Container>
      <Header as="h1" textAlign="center">
        Recent Posts
      </Header>
      <Grid columns={4} stackable doubling>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <Spinner size="large" />
        ) : (
          <Grid.Row>
            <Transition.Group duration={500}>
              {data.getPosts &&
                data.getPosts.map((post) => {
                  return (
                    <Grid.Column key={post.id}>
                      <PostCard post={post} />
                      <Divider hidden />
                    </Grid.Column>
                  );
                })}
            </Transition.Group>
          </Grid.Row>
        )}
      </Grid>
    </Container>
  );
};

export default Home;

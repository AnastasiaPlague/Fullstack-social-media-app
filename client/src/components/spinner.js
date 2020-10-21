import React from "react";
import { Dimmer, Grid, Image, Loader, Segment } from "semantic-ui-react";

const Spinner = ({ size }) => {
  return !size ? (
    <Segment>
      <Dimmer active inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
      <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
    </Segment>
  ) : (
    <Grid.Row centered>
      <Segment>
        <Dimmer active inverted>
          <Loader size="big">Loading</Loader>
        </Dimmer>

        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    </Grid.Row>
  );
};

export default Spinner;

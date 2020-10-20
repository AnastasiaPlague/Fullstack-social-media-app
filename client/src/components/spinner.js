import React from "react";
import { Dimmer, Image, Loader, Segment } from "semantic-ui-react";

const Spinner = () => {
  return (
    <div>
      <Segment>
        <Dimmer active inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
      </Segment>
    </div>
  );
};

export default Spinner;

import React from "react";
import ReactDOM from "react-dom";
import ApolloProvider from "./apollo-provider";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>{ApolloProvider}</React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();

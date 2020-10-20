import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import { AuthProvider } from "./context/auth";
import Menu from "./components/menu";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import AuthRoute from "./utils/auth-route";
import SinglePost from "./pages/single-post";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container>
          <Menu />
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/register" component={Register} />
          <Route exact path="/posts/:postId" component={SinglePost} />
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;

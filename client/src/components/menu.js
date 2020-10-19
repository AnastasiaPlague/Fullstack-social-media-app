import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

export default function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");
  const { pathname } = useLocation();
  const { user, logout } = useContext(AuthContext);

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const menuBar = !user ? (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name="home" active={activeItem === "/"} as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          active={activeItem === "/login"}
          as={Link}
          to="/login"
        />
        <Menu.Item
          name="register"
          active={activeItem === "/register"}
          as={Link}
          to="/register"
        />
      </Menu.Menu>
    </Menu>
  ) : (
    <Menu pointing secondary size="massive" color="teal">
      <Menu.Item name={user.username} active as={Link} to="/" />
      <Menu.Menu position="right">
        <Menu.Item name="logout" onClick={logout} />
      </Menu.Menu>
    </Menu>
  );
  return menuBar;
}

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuBar() {
  const [activeItem, setActiveItem] = useState("home");
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  return (
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
  );
}

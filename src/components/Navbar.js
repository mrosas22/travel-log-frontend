import React from "react";
import { Container, Image, Menu } from "semantic-ui-react";

const Navbar = () => (
  <div className="header">
    <Menu>
      <Container>
        <Menu.Item as="a" header>
          <Image
            size="small"
            src="https://www.robinwieruch.de/img/page/logo.svg"
          />
        </Menu.Item>

        <Menu.Menu position="right">
          <Menu.Item as="a" name="login">
            Login
          </Menu.Item>

          <Menu.Item as="a" name="register">
            Register
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  </div>
);

export default Navbar;
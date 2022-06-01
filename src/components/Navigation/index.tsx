import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

export default function MenuExampleBasic() {
    return (
        <Menu>
            <Menu.Item as={Link} to="/">
                Home
            </Menu.Item>

            <Menu.Item as={Link} to={"/beatles"}>
                Beatles
            </Menu.Item>

            <Menu.Item as={Link} to={"/game-industry"}>
                Game industry
            </Menu.Item>
        </Menu>
    );
}

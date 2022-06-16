import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";

interface Props {
    title?: string;
}

const Home: FC<Props> = () => {
    return (
        <Container>
            <Header as={"h1"}>Database Examples</Header>
            <p>Chose from the menu on top of the page for the examples.</p>
            <article>
                <Header as={"h2"}>
                    <Link to={'/beatles'}>Beatles App</Link>
                </Header>
                <p>
                    Simple application where click interaction ads a new data into the
                    database, and the reactive hook reacts to the change and updates the
                    table.
                </p>
            </article>
            <br />
            <article>
                <Header as={"h2"}>
                    <Link to={'/game-industry'}>Game Industry App</Link>
                </Header>
                <p>
                    In the Game Industry example, you can check how to use the 'useInsert'
                    hook, that INSERTs a big chunck of data in the db
                    (Samples/gameIndustry/Starter).
                </p>
            </article>
            <br />
            <article>
                <Header as={"h2"}>
                    <Link to={'/gdp'}>GDP per capita comparison</Link>
                </Header>
                <p>
                    The GDP application demonstrates two features: 1. how to fetch sqlite files; 2. How to setup custom
                    functions to be used in the SQL queries.
                </p>
            </article>
        </Container>
    );
};

export default Home;

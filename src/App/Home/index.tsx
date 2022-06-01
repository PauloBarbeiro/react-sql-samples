import React, { FC } from "react";
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
                <Header as={"h2"}>Beatles App</Header>
                <p>
                    Simple application where click interaction ads a new data into the
                    database, and the reactive hook reacts to the change and updates the
                    table.
                </p>
            </article>
            <br />
            <article>
                <Header as={"h2"}>Game Industry App</Header>
                <p>
                    In the Game Industry example, you can check how to use the 'useInsert'
                    hook, that INSERTs a big chunck of data in the db
                    (Samples/gameIndustry/Starter).
                </p>
            </article>
        </Container>
    );
};

export default Home;

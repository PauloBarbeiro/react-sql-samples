import React, { FC } from "react";
import {Card, Container, Header, Menu, Table} from "semantic-ui-react";

import { useQuery } from "reactive-sql-toolkit";

interface Props {
    title?: string;
}

const BeatlesTable: FC<Props> = () => {
    const { result, writeQueryFn } = useQuery("SELECT age,name FROM beatles");

    const handleAddLennon = () => {
        writeQueryFn("INSERT INTO beatles VALUES (3, 22, 'John');");
    };

    const handleAddGeorge = () => {
        writeQueryFn("INSERT INTO beatles VALUES (4, 25, 'George');");
    };

    if (!result || result.length === 0) {
        return <p>No data available</p>;
    }

    const [data] = result;

    return (
        <Container>
            <Header as={"h1"}>Add a beatle</Header>

            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header>Code Reference</Card.Header>
                        <Card.Description>
                            <a
                                href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/Beatles/index.tsx"}
                                target={"_blank"}
                            >
                                Check the sql setup here
                            </a>
                            <br/>
                            <a
                                href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/Beatles/Table/index.tsx"}
                                target={"_blank"}
                            >
                                Check the SQL query hooks here
                            </a>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>

            <Table celled>
                <Table.Header>
                    <Table.Row>
                        {data.columns.map((column, index) => (
                            <Table.HeaderCell key={index}>{column}</Table.HeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {data.values.map(([age, name], index) => (
                        <Table.Row key={index}>
                            <Table.Cell scope="row">{name}</Table.Cell>
                            <Table.Cell>{age}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan="3">
                            <Menu floated="right" attached>
                                <Menu.Item as="button" onClick={handleAddLennon}>
                                    Add Lennon
                                </Menu.Item>
                                <Menu.Item as="button" onClick={handleAddGeorge}>
                                    Add Harrison
                                </Menu.Item>
                            </Menu>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        </Container>
    );
};

export default BeatlesTable;

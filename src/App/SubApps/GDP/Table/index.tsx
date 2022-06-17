import React, { FC, useState } from "react";
import {Container, Card, Header, Table, Select, DropdownItemProps} from "semantic-ui-react";

import { useQuery } from "reactive-sql-toolkit";

interface Props {
    title?: string;
}

const GdpTable: FC<Props> = () => {
    const [base, setBase] = useState<string>()
    const [other, setOther] = useState<string>()
    const { result: countries } = useQuery(`Select distinct entity, code FROM gdp`);
    const { result } = useQuery(`
            SELECT 
                B.year, B.entity, B.per_capita, O.entity, O.per_capita, richer(B.entity, B.per_capita, O.entity, O.per_capita) as richer
            FROM 
                gdp B, gdp O 
            WHERE 
                (B.code='${base}' AND O.code='${other}') AND (B.year=O.year)
        `);

    const [countriesData] = countries ?? []
    const [data] = result ?? [];

    const options = countriesData?.values?.map(([name, code, idx]) => {
            if(!code) return null
            return <option key={`${code}`} value={`${code}`}>{name}</option>
        })
        .filter(o => !!o)

    return (
        <Container>
            <Header as={"h1"}>GDP per capital, 1820 to 2018</Header>

            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header>Code Reference</Card.Header>
                        <Card.Description>
                            <a
                                href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/GDP/index.tsx"}
                                target={"_blank"}
                            >
                                Check the setup with sql file loading and custom function.
                            </a>
                            <br/>
                            <a
                                href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/GDP/Table/index.tsx"}
                                target={"_blank"}
                            >
                                Check the SELECT query with custom function here.
                            </a>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>

            <Card.Group>
                <Card>
                    <Card.Content>
                        <Card.Header>Select base country</Card.Header>
                        <Card.Description>
                            <select
                                onChange={({currentTarget: { value }}) => setBase(value)}
                            >
                                <option>Select Country</option>
                                {options}
                            </select>
                        </Card.Description>
                    </Card.Content>
                </Card>

                <Card>
                    <Card.Content>
                        <Card.Header>Select comparison country</Card.Header>
                        <Card.Description>
                            <select
                                onChange={({currentTarget: { value }}) => setOther(value)}
                            >
                                <option>Select Country</option>
                                {options}
                            </select>
                        </Card.Description>
                    </Card.Content>
                </Card>
            </Card.Group>

            {data ? (
                <Table celled>
                    <Table.Header>
                        <Table.Row>Source: https://ourworldindata.org/economic-growth</Table.Row>
                        <Table.Row>
                            {data.columns.map((column, index) => (
                                <Table.HeaderCell key={index}>{column}</Table.HeaderCell>
                            ))}
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {data.values.map(([year, base, baseIncome, other, otherIncome, richer], index) => (
                            <Table.Row key={index}>
                                <Table.Cell scope="row">{year}</Table.Cell>
                                <Table.Cell>{base}</Table.Cell>
                                <Table.Cell>{baseIncome}</Table.Cell>
                                <Table.Cell>{other}</Table.Cell>
                                <Table.Cell>{otherIncome}</Table.Cell>
                                <Table.Cell>{richer}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ) : (
                <div>
                    <br/>
                    <p>No data available</p>
                </div>
            )}
        </Container>
    );
};

export default GdpTable;

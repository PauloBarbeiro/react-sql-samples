import React, { FC, useEffect, useState } from "react";
import {Grid, Divider, Container, Header, Card} from "semantic-ui-react";
import createSQL from "reactive-sql-toolkit";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
// @ts-ignore
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

// Components
import DataLoader from "./components/DataLoader";
import NintendoTable from "./components/Nintendo";
import UbisoftTable from "./components/Ubisoft";
import ComparisonTable from "./components/Comparison";
import {Database} from "sql.js";

const marketTableStructure = {
    date: "DATE",
    open: "DOUBLE",
    high: "DOUBLE",
    low: "DOUBLE",
    close: "DOUBLE",
    volume: "INTEGER",
    currency: "TEXT"
};

interface Props {
    refForDebug: React.MutableRefObject<Database | undefined>
}

const GameIndustry: FC<Props> = ({ refForDebug}) => {
    const [isDbReady, setDbReady] = useState<boolean>(false);
    const [showComparison, setShowComparison] = useState<boolean>(false);

    useEffect(() => {
        const schema = {
            tables: {
                ubisoft: {
                    fields: { ...marketTableStructure }
                },
                nintendo: {
                    fields: { ...marketTableStructure }
                }
            }
        };

        // @ts-ignore
        createSQL(sqlWasm, schema)
            .then((res) => {
                if (!!res) {
                    setDbReady(true);
                    refForDebug.current = res
                }
            })
            .catch(console.error);

        return () => {
            refForDebug.current = undefined
        }
    }, []);

    if (!isDbReady) {
        return null;
    }

    return (
        <Container>
            <Grid divided={"vertically"}>
                <Grid.Row>
                    <Header as={"h1"}>Game Industry from 2010 - 2022</Header>
                </Grid.Row>
                <Grid.Row>
                    <Card.Group>
                        <Card>
                            <Card.Content>
                                <Card.Header>Code Reference</Card.Header>
                                <Card.Description>
                                    <a
                                        href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/GameIndustry/index.tsx"}
                                        target={"_blank"}
                                    >
                                        Check the sql setup here
                                    </a>
                                    <br/>
                                    <a
                                        href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/GameIndustry/components/Ubisoft/index.tsx"}
                                        target={"_blank"}
                                    >
                                        Check simple SELECT SQL reactive query hooks here
                                    </a>
                                    <br/>
                                    <a
                                        href={"https://github.com/PauloBarbeiro/react-sql-samples/blob/master/src/App/SubApps/GameIndustry/components/Comparison/index.tsx"}
                                        target={"_blank"}
                                    >
                                        Check the SELECT with JOIN reactive query hooks here
                                    </a>
                                </Card.Description>
                            </Card.Content>
                        </Card>
                    </Card.Group>
                </Grid.Row>
                <Grid.Row>
                    <DataLoader />
                </Grid.Row>
                <Grid.Row columns={3}>
                    <Grid.Column>
                        <NintendoTable />
                    </Grid.Column>
                    <Grid.Column>
                        <UbisoftTable />
                    </Grid.Column>
                    <Grid.Column>
                        <ComparisonTable />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Container>
    );
};

export default GameIndustry;

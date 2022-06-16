import React, { FC, useEffect, useState } from "react";
import createSQL from "reactive-sql-toolkit";

// Required to let webpack 4 know it needs to copy the wasm file to our assets
// @ts-ignore
import sqlWasm from "!!file-loader?name=sql-wasm-[contenthash].wasm!sql.js/dist/sql-wasm.wasm";

// Types
import { Database}  from "sql.js";

// Components
import BeatlesTable from "./Table";

interface Props {
    refForDebug: React.MutableRefObject<Database | undefined>
}

function richer(base: string, baseIncome: string, other: string, otherIncome: string): string {
    if(baseIncome == otherIncome) {
        return 'EQUALS'
    }
    const a = parseInt(baseIncome, 10), b = parseInt(otherIncome, 10)
    if(a > b) {
        return base
    } else {
        return other
    }
}

const Beatles: FC<Props> = ({ refForDebug}) => {
    const [isDbReady, setDbReady] = useState<boolean>(false);

    useEffect(() => {
        fetch(process.env.PUBLIC_URL + '/gdp.sqlite', {
            headers: {
                "Accept-Encoding": "gzip"
            }
        })
            .then(res => res.arrayBuffer())
            .then(dataBuffer => {
                const schema: any = {
                    tables: {
                        gdp: {
                            fields: { entity: "TEXT", code: "TEXT", year: "TEXT", per_capita: "TEXT" },
                        }
                    },
                    dataBuffer,
                };

                const functions = {
                    richer,
                }

                // @ts-ignore
                createSQL(sqlWasm, schema, functions)
                    .then(async (res) => {
                        if (!!res) {
                            setDbReady(true);
                            refForDebug.current = res
                        }
                    })
                    .catch(console.error);
            })

        return () => {
            refForDebug.current = undefined
        }
    }, []);

    if (!isDbReady) {
        return <p>...Loading sql file</p>;
    }

    return <BeatlesTable />;
};

export default Beatles;

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

const Beatles: FC<Props> = ({ refForDebug}) => {
    const [isDbReady, setDbReady] = useState<boolean>(false);

    useEffect(() => {
        const schema: any = {
            beatles: {
                fields: { id: "INTEGER", age: "INTEGER", name: "TEXT" },
                values: [
                    { id: 1, age: 20, name: "Ringo" },
                    { id: 2, age: 18, name: "Paul" }
                ]
            }
        };

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

    return <BeatlesTable />;
};

export default Beatles;

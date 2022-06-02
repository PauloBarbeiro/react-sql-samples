import React, {useState, useEffect, useRef} from "react";
import "./styles.css";

// Types
import {Database, QueryExecResult, SqlValue} from "sql.js";

interface ConsoleProps {
    dbRef: React.MutableRefObject<Database | undefined>
}

export default function Console({ dbRef }: ConsoleProps) {
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(!dbRef.current) {
            setError('Db ref not set')
        } else {
            setError(null)
        }
    }, []);

    if (error) return <pre>{error.toString()}</pre>;
    else if (!dbRef.current) return <pre>Loading...</pre>;
    else return <SQLRepl db={dbRef.current}/>;
}

interface SQLReplProps {
    db: Database
}

/**
 * A simple SQL read-eval-print-loop
 * @param {{db: import("sql.js").Database}} props
 */
function SQLRepl({ db }: SQLReplProps) {
    const [error, setError] = useState<unknown>(null);
    const [results, setResults] = useState<Array<QueryExecResult>>([]);
    const displayTimeRef = useRef<HTMLPreElement>()

    function exec(sql: string) {
        try {
            // The sql is executed synchronously on the UI thread.
            // You may want to use a web worker here instead
            const a = performance.now()
            const result = db.exec(sql)
            const b = performance.now()
            setResults(result); // an array of objects is returned
            setError(null);
            // @ts-ignore
            displayTimeRef.current ? displayTimeRef.current.innerText = `${b-a} milliseconds` : null;
        } catch (err) {
            // exec throws an error when the SQL statement is invalid
            setError(err);
            setResults([]);
        }
    }

    return (
        <div  id={'console'}>
            <h3 className={'consoleHeader'}>SQL interpreter</h3>

            <textarea
                onChange={(e) => exec(e.target.value)}
                placeholder="Enter some SQL. No inspiration ? Try “select sqlite_version()”"
            ></textarea>
            {/* @ts-ignore */}
            <pre className="error">{(error || "").toString()}</pre>
            {/* @ts-ignore */}
            <pre ref={displayTimeRef} className="time"></pre>

            <pre>
            {
                // Result contains one object per select statement in the query
                results.map(({columns, values}, i) => (
                    <ResultsTable key={i} columns={columns} values={values}/>
                ))
            }
            </pre>
        </div>
    );
}

interface ResultsTableProps {
    columns: Array<string>;
    values: Array<Array<SqlValue>>;
}

/**
 * Renders a single value of the array returned by db.exec(...) as a table
 * @param {import("sql.js").QueryExecResult} props
 */
function ResultsTable({ columns, values }: ResultsTableProps) {
    return (
        <table>
            <thead>
            <tr>
                {columns.map((columnName, i) => (
                    <td key={i}>{columnName}</td>
                ))}
            </tr>
            </thead>

            <tbody>
            {
                // values is an array of arrays representing the results of the query
                values.map((row, i) => (
                    <tr key={i}>
                        {row.map((value, i) => (
                            <td key={i}>{value}</td>
                        ))}
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}

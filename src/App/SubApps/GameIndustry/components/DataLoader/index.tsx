import React from "react";
import { useInsert } from "reactive-sql-toolkit";

// Queries
import {
    insertNintendoQuery,
    insertUbisoftQuery
} from "../../../../../dataSamples/Queries/GameIndustry";

const Starter = () => {
    const insert = useInsert();

    const handleLoadNintendo = () => {
        insert(insertNintendoQuery.query);
    };

    const handleLoadUbisoft = () => {
        insert(insertUbisoftQuery.query);
    };

    return (
        <div>
            <strong>
                Load the data of the related companies by clicking on the buttons
            </strong>
            <br />
            <br />
            <button onClick={handleLoadNintendo}>Load Nintendo</button>&nbsp;
            <button onClick={handleLoadUbisoft}>Load Ubisoft</button>
        </div>
    );
};

export default Starter;

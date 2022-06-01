import React from "react";
import { useSelect } from "reactive-sql-toolkit";

// Components
import CardTable from "../../../../../components/CardTable";

const ComparisonTable = () => {
    const result = useSelect(`SELECT 
    ubisoft.date,
    ROUND(ubisoft.close - nintendo.close, 2) as diff
    FROM 
      ubisoft as ubisoft 
    JOIN 
      nintendo as nintendo 
    ON 
      ubisoft.date = nintendo.date
    WHERE 
      ubisoft.date BETWEEN '2021-01-01' and '2021-12-31' 
    LIMIT 10`);

    return <CardTable header={"Ubisoft vs. Nintendo"} queryResult={result || []} />;
};

export default ComparisonTable;

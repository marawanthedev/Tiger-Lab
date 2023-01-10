import React, { useEffect, useState } from "react";
import { request } from "../../lib/axios";
import { AxiosMethods } from "../../constants/AxiosMethods";
import { CustomTable } from "../../components";
import { HeadCell } from "../../components/CustomTable/CustomTable";

import "./ClaimList.scss";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export default function ClaimList() {
  const [claims, setClaims] = useState<any>();
  const [claimsHeads, setClaimsHeads] = useState<HeadCell[]>();

  async function fetchClaims() {
    const data = await request({
      endpoint: "/claims",
      method: AxiosMethods.GET,
    });

    setClaims(data);
  }

  const generateTableHead = () => {
    const sampleItem = claims[0];
    const keys = Object.keys(sampleItem || {});

    const tableHead: HeadCell[] = keys.map((key: any) => {
      return {
        id: key,
        label: key,
        numeric: typeof sampleItem[key] === "number" ? true : false,
      };
    });

    return tableHead;
  };

  const handleTableRendering = () => {
    if (!claims || !claimsHeads) return;
    if (claims && claimsHeads)
      return <CustomTable tableHeadItems={claimsHeads} tableItems={claims} />;
  };
  useEffect(() => {
    fetchClaims();
  }, []);

  useEffect(() => {
    if (claims) setClaimsHeads(generateTableHead());
  }, [claims]);

  return (
    <div className="claim-list flex justify-content-center align-items-center">
      <div className="claim-list_table-container">
        {/* <CustomTable rowItems={claims} headItems={claimsHeads} /> */}
        {handleTableRendering()}
      </div>
    </div>
  );
}

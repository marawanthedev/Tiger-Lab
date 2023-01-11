import React, { useEffect, useState } from "react";
import { request } from "../../lib/axios";
import { AxiosMethods } from "../../constants/AxiosMethods";
import { CustomTable } from "../../components";
import { HeadCell } from "components/CustomTable/constants";
import { FormInput } from "../../interface";

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
  const [filtedClaims, setFilteredClaims] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

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
      return (
        <CustomTable
          tableHeadItems={claimsHeads}
          tableItems={searchValue === "" ? claims : filtedClaims}
        />
      );
  };
  const handleTableItemsSearch = () => {
    // goal
    // 1- search through  claim id
    // 2- search through holderName
    // 3- seach through policy number
    // if any of those 3 includes search value return it

    const filteredClaims = claims.filter((claim: any) => {
      if (
        String(claim.id).toLowerCase().includes(searchValue.toLowerCase()) ||
        String(claim.policeNumber)
          .toLowerCase()
          .includes(searchValue.toLowerCase()) ||
        String(claim.holder).toLowerCase().includes(searchValue.toLowerCase())
      ) {
        return claim;
      }
    });

    setFilteredClaims(filteredClaims);
  };
  useEffect(() => {
    fetchClaims();
  }, []);

  useEffect(() => {
    if (claims) setClaimsHeads(generateTableHead());
  }, [claims]);
  useEffect(() => {
    // only exec if claims were actually fetched
    if (claims) {
      handleTableItemsSearch();
    }
  }, [searchValue]);
  return (
    <div className="claim-list flex flex-column justify-content-center align-items-center">
      <div className="claim-list_tool-bar flex justify-content-between align-items-center">
        <FormInput
          label="Search Claims"
          placeholder="search claims"
          onChangeCallBack={(value: string) => setSearchValue(value)}
        />
        <div className="custom-table_tool-bar_dropdown">Drop down</div>
      </div>
      <div className="claim-list_table-container">
        {/* <CustomTable rowItems={claims} headItems={claimsHeads} /> */}
        {handleTableRendering()}
      </div>
    </div>
  );
}

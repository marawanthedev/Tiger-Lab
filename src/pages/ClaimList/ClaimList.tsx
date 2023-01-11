import React, { useEffect, useState } from "react";
import { request } from "../../lib/axios";
import { AxiosMethods } from "../../constants/AxiosMethods";
import { CustomTable } from "../../components";
import { HeadCell } from "components/CustomTable/constants";
import { FormInput } from "../../interface";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import "./ClaimList.scss";

export default function ClaimList() {
  const [claims, setClaims] = useState<any>();
  const [claimsHeads, setClaimsHeads] = useState<HeadCell[]>();
  const [filteredClaims, setFilteredClaims] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [status, setStatus] = React.useState("");

  const statusOptions = [
    "Submitted",
    "Approved",
    "Processed",
    "Completed",
    "Rejected",
  ];

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

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

  const getTableItems = () => {
    if (searchValue !== "" || status !== "") return filteredClaims;
    else return claims;
  };
  const handleTableRendering = () => {
    if (!claims || !claimsHeads) return;
    if (claims && claimsHeads)
      return (
        <CustomTable
          tableHeadItems={claimsHeads}
          tableItems={getTableItems()}
        />
      );
  };
  const getMenuOptions = () => {
    return statusOptions.map((statusOption) => (
      <MenuItem value={statusOption} className="f-s-override">
        {statusOption}
      </MenuItem>
    ));
  };
  const filterClaimsByStatus = () => {
    const filteredClaims = claims.filter((claim: any) => {
      if (claim.status.toLowerCase() === status.toLowerCase()) return claim;
    });
    setFilteredClaims(filteredClaims);
  };
  const handleTableItemsSearch = () => {
    // Steps
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
  useEffect(() => {
    if (claims) filterClaimsByStatus();
  }, [status]);

  return (
    <div className="claim-list flex flex-column justify-content-center align-items-center">
      <div className="claim-list_tool-bar flex justify-content-between align-items-center">
        <FormInput
          label="Search Claims"
          placeholder="search claims"
          onChangeCallBack={(value: string) => setSearchValue(value)}
        />
        <div className="custom-table_tool-bar_dropdown">
          <Box sx={{ minWidth: 250 }}>
            <FormControl fullWidth>
              <InputLabel
                id="demo-simple-select-label"
                className="f-s-override"
              >
                Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Status"
                onChange={handleChange}
                className="f-s-override"
              >
                {getMenuOptions()}
              </Select>
            </FormControl>
          </Box>
        </div>
      </div>
      <div className="claim-list_table-container">{handleTableRendering()}</div>
    </div>
  );
}

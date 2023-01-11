import React, { useEffect, useState } from "react";
import { request } from "../../lib/axios";
import { AxiosMethods } from "../../constants/AxiosMethods";
import { CustomTable } from "../../components";
import { HeadCell } from "components/CustomTable/constants";

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

  function addTotalAmountAttribute(claims: any) {
    const claimsWithTotalAmount = claims.map((claim: any) => {
      return {
        ...claim,
        totalAmount: Math.round(
          Number(claim.amount) + Number(claim.processingFee)
        ),
      };
    });
    setClaims(claimsWithTotalAmount);
  }
  async function fetchClaims() {
    try {
      const data = await request({
        endpoint: "/claims",
        method: AxiosMethods.GET,
      });

      addTotalAmountAttribute(data);
    } catch (err) {
      console.error(err);
    }
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
    tableHead.push({ id: "totalAmount", label: "Total Amount", numeric: true });

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
  const mimicId = new Date();

  return (
    <div className="claim-list flex flex-column justify-content-center align-items-center">
      <div className="claim-list_tool-bar flex justify-content-between align-items-center">
        <div className="flex flex-column justify-content-center">
          <label htmlFor={String(mimicId)}>Search Claims</label>
          <input
            id={String(mimicId)}
            type="text"
            className="input-field"
            placeholder="search claims"
            onChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
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

// package depend
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// styling depend
import "./App.scss";

// component depend
import { Spinner, Template } from "./interface";

// lazy component depend
const Claim = lazy(() => import("./pages/Claim/Claim"));
const ClaimList = lazy(() => import("./pages/ClaimList/ClaimList"));

export const App = () => {
  return (
    <div className="App flex flex-column f-montserat ">
      <Template>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Claim />} />
            <Route path="/list" element={<ClaimList />} />
          </Routes>
        </Suspense>
      </Template>
    </div>
  );
};

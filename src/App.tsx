// package depend
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// styling depend
import "./App.scss";

// component depend
const Claim = lazy(() => import("./pages/Claim/Claim"));
const ClaimList = lazy(() => import("./pages/ClaimList/ClaimList"));

export const App = () => {
  return (
    <div className="App flex flex-column justify-content-center align-items-center">
      <Suspense fallback={<h1>Loading ...</h1>}>
        <Routes>
          <Route path="/" element={<Claim />} />
          <Route path="/list" element={<ClaimList />} />
        </Routes>
      </Suspense>
    </div>
  );
};

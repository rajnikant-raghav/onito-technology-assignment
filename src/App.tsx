import React from "react";
import PersonalDetails from "./components/PersonalDetails.tsx";
import AddressDetails from "./components/AddressDetails.tsx";
import { Routes, Route } from "react-router-dom";
import Table from "./components/Table.js";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PersonalDetails />} />
      <Route path="/address" element={<AddressDetails />} />
      <Route path="/address/table" element={<Table />} />
    </Routes>
  );
};

export default App;

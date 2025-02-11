import "./App.css";
import BillGrid from "@/components/bill-grid";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const sampleBills = [
  {
    id: 1,
    item: {
      code: "HB-123",
      title: "Sample Bill 1",
      sponsor: "John Doe",
      action: "Pending",
    },
  },
  {
    id: 2,
    item: {
      code: "SB-456",
      title: "Sample Bill 2",
      sponsor: "Jane Smith",
      action: "Approved",
    },
  },
];

function App() {
  return (
    <>
      <BillGrid items={sampleBills} />
    </>
  );
}

export default App;

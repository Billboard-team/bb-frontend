import "./App.css";
import BillGrid from "@/components/bill-grid";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";
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

// function App() {
//   return (
//     <>
//       <BillGrid items={sampleBills} />
//     </>
//   );
// }

function App() {
  // No routing here – just a normal component
  return (
    <div>
      <h1>My App Component</h1>
      <BillGrid items={sampleBills} />
    </div>
  );
}

export default App;

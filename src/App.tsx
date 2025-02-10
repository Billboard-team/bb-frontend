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
  return (
    <BrowserRouter>
      <Routes>
        {/* Parent route using the shared Layout */}
        <Route path="/" element={<Layout />}>
          {/* index makes this the default child route for "/" */}
          <Route index element={<Dashboard />} />

          {/* Add more child routes as needed:
              <Route path="other" element={<OtherPage />} />
           */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

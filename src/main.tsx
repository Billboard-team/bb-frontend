import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import Dashboard from "@/pages/dashboard";
import DetailView from "@/pages/detail-view";
import DashboardLayout from "@/pages/dashboard-layout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="/post/:id" element={<DetailView/> } />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

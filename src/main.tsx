import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import App from "@/App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import Dev from "@/pages/dev-page";
import Layout from "./pages/layout";
import Dashboard from "./pages/dashboard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          {/* Layout route */}
          <Route path="/" element={<Layout />}>
            {/* index means "/" exactly, displays the Dashboard inside <Outlet /> */}
            <Route index element={<Dashboard />} />
          </Route>

          {/* Another example route without Layout */}
          <Route path="/dev" element={<Dev />} />

          {/* If you want to show App on some path, e.g. "/app" */}
          <Route path="/app" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

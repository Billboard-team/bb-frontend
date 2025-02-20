import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import Dashboard from "@/pages/dashboard";
import DashboardLayout from "@/pages/dashboard-layout";
import SignInForm from "@/pages/sign-in-page";
import FriendListPage from "@/pages/friend-list-page";
import DM from "@/pages/dm-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="signin" element={<SignInForm />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
          </Route>

          <Route path="friendlist" element={<DashboardLayout />}>
            <Route index element={<FriendListPage />} />
          </Route>
          <Route path="message" element={<DashboardLayout />}>
            <Route index element={<DM />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

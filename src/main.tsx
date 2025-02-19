import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import Dashboard from "@/pages/dashboard";
import DashboardLayout from "@/pages/dashboard-layout";
import UserProfile from "@/pages/userprofile";
import SignInForm from '@/pages/sign-in-page';
import FriendListPage from "@/pages/friend-list-page";
import SignupForm from "./pages/sign-up-page";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='signin' element={<SignInForm />} />
          <Route path='signup' element={<SignupForm />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<UserProfile />} />{" "}
            <Route path="/profile/friendlist" element={<FriendListPage />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);

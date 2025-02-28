// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "@/components/ui/provider";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Fixed import
import Dashboard from "@/pages/dashboard";
import DetailView from "@/pages/detail-view";
import DashboardLayout from "@/pages/dashboard-layout";
import UserProfile from "@/pages/userprofile";
import SignInForm from '@/pages/sign-in-page';
import FriendListPage from "@/pages/friend-list-page";
import SignupForm from "./pages/sign-up-page";
import DMPage from "@/pages/dm-page";
import Dev from "./pages/dev-page";
import { FilterProvider } from "@/components/filter-context";

createRoot(document.getElementById("root")!).render(
  <Provider>
    <BrowserRouter>
      <FilterProvider>
        <Routes>
          <Route path='signin' element={<SignInForm />} />
          <Route path='signup' element={<SignupForm />} />

          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="post/:id" element={<DetailView/> } />

            <Route path="profile">
              <Route path="" element={<UserProfile />} />{" "}
              <Route path="friendlist" element={<FriendListPage />} />
              <Route path="messages" element={<DMPage />} />
            </Route>
          </Route>

          <Route path="dev" element={<Dev/>}/>
        </Routes>
      </FilterProvider>
    </BrowserRouter>
  </Provider>
);

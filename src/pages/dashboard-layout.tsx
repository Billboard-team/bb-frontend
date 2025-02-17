import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "@/components/dashboard-header";
import DashboardSidebar from "@/components/dashboard-sidebar";

const DashboardLayout = () => {
  return (
    <Flex direction="column" h="100vh">
      <DashboardHeader />
      <Flex flex="1">
        <DashboardSidebar />
        <Flex flex="1" direction="column" p={5}>
          <Outlet />{" "}
          {/* This is where child components (DashboardHome, etc.) render */}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default DashboardLayout;

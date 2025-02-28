import RecommendedBills from "@/components/recommendedbill-header";
import TrendingBills from "@/components/trendingbill-header";
import { Stack, StackSeparator } from "@chakra-ui/react";

const Dashboard = () => {
  return (
    <>
      <Stack separator={<StackSeparator/>} gapY={2}>
        <TrendingBills />
        <RecommendedBills />
      </Stack>
    </>
  );
};
export default Dashboard;




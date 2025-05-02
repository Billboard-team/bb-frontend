import OnboardingDialog from "@/components/modal-onboarding";
import RecommendedBills from "@/components/recommendedbill-header";
import TrendingBills from "@/components/trendingbill-header";
import FollowedBills from "@/components/followedbill-header";
import { Stack, StackSeparator } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <>
      <Stack separator={<StackSeparator/>} gapY={2}>

        {isAuthenticated ?
          <>
            <FollowedBills />
            <RecommendedBills />
          </> : <TrendingBills /> }
        <OnboardingDialog/>
      </Stack>
    </>
  );
};
export default Dashboard;




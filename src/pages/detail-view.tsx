import RecommendedBills from "@/components/recommendedbill-header";
import DetailBillCard from "@/components/bill-card-detailed";
import { Box, Grid, HStack, Stack, StackSeparator, Image } from "@chakra-ui/react";
import CommentSection from "@/pages/comment"; // Import Comment Component

//TODO: write function to pull backend data based on bill code in url.
// for now it uses example bill, but route is still unique and shareable!
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

// TODO: will have to change <CommentSection billId={sampleBills[1].id} />  
// to <CommentSection billId={selectedBill} /> later, when we slecting a bill Dynamically

const Dashboard = () => {
  return (
    <>
      <Stack separator={<StackSeparator/>} gapY={2}>
        <Box mb={6}>
        <Grid autoRows="auto" templateColumns="repeat(1, minmax(350px, 1fr))" gap={6}>
            <DetailBillCard item={sampleBills[1].item} />
          </Grid>
          <CommentSection billId={sampleBills[1].id} />  
      </Box>
      </Stack>
    </>
  );
};
export default Dashboard;
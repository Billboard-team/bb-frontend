import RecommendedBills from "@/components/recommendedbill-header";
import DetailBillCard from "@/components/bill-card-detailed";
import { Box, Grid, HStack, Stack, StackSeparator, Image, Text, Spinner } from "@chakra-ui/react";
import CommentSection from "@/pages/comment"; // Import Comment Component
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


interface Bill {
  bill_id: number;
  title: string;
  action: string;
  action_date: string;
  description: string;
  congress: number;
  bill_type: string;
  bill_number: string;
  summary?: string | null;
  text?: string | null;
  url: string;
}

//TODO: write function to pull backend data based on bill code in url.
// for now it uses example bill, but route is still unique and shareable!
// const sampleBills = [
//   {
//     id: 1,
//     bill: {
//       bill_id: 1,
//       title: "Sample Bill 1",
//       action: "Pending",
//       action_date: "2024-03-20",
//       description: "A sample bill description",
//       congress: 118,
//       bill_type: "HB",
//       bill_number: "123",
//       url: "https://example.com/bill/123"
//     }
//   },
//   {
//     id: 2,
//     bill: {
//       bill_id: 2,
//       title: "Sample Bill 2",
//       action: "Approved",
//       action_date: "2024-03-19",
//       description: "Another sample bill description",
//       congress: 118,
//       bill_type: "SB",
//       bill_number: "456",
//       url: "https://example.com/bill/456"
//     }
//   }
// ];

// TODO: will have to change <CommentSection billId={sampleBills[1].id} />  
// to <CommentSection billId={selectedBill} /> later, when we slecting a bill Dynamically

// const Dashboard = () => {
//   return (
//     <>
//       <Stack separator={<StackSeparator/>} gapY={2}>
//         <Box mb={6}>
//         <Grid autoRows="auto" templateColumns="repeat(1, minmax(350px, 1fr))" gap={6}>
//             <DetailBillCard bill={sampleBills[1].bill} />
//           </Grid>
//           <CommentSection billId={sampleBills[1].id} />  
//       </Box>
//       </Stack>
//     </>
//   );
// };
// export default Dashboard;

const DetailView = () => {
  const { id } = useParams<{ id: string }>();  
  const [bill, setBill] = useState<Bill | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('id:',id);
    fetch(`http://localhost:8000/api/bills/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.bill) {
          setBill(data.bill);
          console.log("Received bill data:", data.bill);
        } else {
          setBill(null);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching bill details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner size="xl" />;
  if (!bill) return <Text fontSize="xl" color="red.500">Bill not found</Text>;

  return (
    <Stack separator={<StackSeparator />} gapY={2}>
      <Box mb={6}>
        <Grid autoRows="auto" templateColumns="repeat(1, minmax(350px, 1fr))" gap={6}>
          <DetailBillCard bill={bill} />
        </Grid>
        <CommentSection billId={bill.bill_id} />
      </Box>
    </Stack>
  );
};

export default DetailView;
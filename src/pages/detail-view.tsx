import DetailBillCard from "@/components/bill-card-detailed";
import { Box, Grid, Stack, StackSeparator, Text, Spinner } from "@chakra-ui/react";
import CommentSection from "@/pages/comment"; // Import Comment Component
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { BillCardProp } from "@/components/type";

const DetailView = () => {
  const { id } = useParams<{ id: string }>();  
  const [bill, setBill] = useState<BillCardProp | null>(null);
  const [loading, setLoading] = useState(true);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    //fetch bill information and cosponsors
    fetch(`http://localhost:8000/api/bills/${id}`)
      .then(response => response.json())
      .then(data => {
        if (data.bill) {
          setBill(data.bill);
        } else {
          setBill(null);
        }
      })
      .catch(error => {
        console.error("Error fetching bill details:", error);
      })
      .finally(() => setLoading(false));
  }, [id]);

  // Track bill view
  useEffect(() => {
    const trackBillView = async () => {
      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: "https://billboard.local",
          },
        });

        await fetch(`http://localhost:8000/api/bills/${id}/view/`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error tracking bill view:", error);
      }
    };

    if (id) {
      trackBillView();
    }
  }, [id, getAccessTokenSilently]);

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

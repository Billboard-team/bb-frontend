import { useEffect, useState } from "react";
import { Box, Heading, HStack, Text, IconButton, Skeleton } from "@chakra-ui/react";
import BillGrid from "./bill-grid"; // Ensure this is correctly implemented
import { LuRotateCcw } from "react-icons/lu";
import { BillCardProp } from "@/components/type";
import { useAuth0 } from "@auth0/auth0-react";

const RecommendedBills = () => {
  const [bills, setBills] = useState<BillCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { getAccessTokenSilently } = useAuth0();

  const fetchRecommendedBills = async () => {
    setLoading(true);
    setError(null);

    const token = await getAccessTokenSilently()

    fetch("http://localhost:8000/api/bills/recommended", {
      headers: {'authorization': `bearer ${token}`}
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Recommended Bills:", data);

        if (!data.bills || !Array.isArray(data.bills)) {
          throw new Error("Invalid response format");
        }

        setBills(data.bills);
      })
      .catch((err) => {
        console.error("Error fetching recommended bills:", err);
        setError("Failed to load recommended bills.");
      })
      .finally(() => setLoading(false));
  };

  // Fetch data on mount
  useEffect(() => {
    fetchRecommendedBills();
  }, []);


  return (
    <Box>
      <HStack my={2}>
        <Heading color="var(--chakra-colors-gray-900)" _dark={{ color: "white" }}>
          Recommended Bills
        </Heading>
        <IconButton
          variant="ghost"
          colorScheme="teal"
          size="sm"
          onClick={fetchRecommendedBills}
          aria-label="Refresh Recommended Bills">
          <LuRotateCcw/>
        </IconButton>
      </HStack>


      {loading && <>
        <Skeleton m={3} height="200px"/>
        <Skeleton m={3} height="200px"/>
        <Skeleton m={3} height="200px"/>
      </> }
      {error && <Text color="red.500">{error}</Text>}

      {!loading && !error && bills.length > 0 && <BillGrid items={bills} />}
    </Box>
  );
};

export default RecommendedBills;

import { useEffect, useState } from "react";
import { Box, Heading, HStack, IconButton, Skeleton, Spinner, Text } from "@chakra-ui/react";
import BillGrid from "./followedbill-grid"; // Ensure this is correctly implemented
import { LuRotateCcw } from "react-icons/lu";
import { BillCardProp } from "@/components/type";
import { useFilters } from "./filter-context";
import { toaster } from "./ui/toaster";
import { useAuth0 } from "@auth0/auth0-react";

const followedBillsURL = "http://localhost:8000/api/bills/followed"

const FollowedBills = () => {

  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [bills, setBills] = useState<BillCardProp[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string>(followedBillsURL);

  const { selectedCategories } = useFilters();

  const fetchFollowedBills = async () => {
    setLoading(false);
    setError(null);

    try {
      const token = await getAccessTokenSilently();
      await fetch(url , {
        method: 'GET',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Fetched Followed Bills:", data);

          // commenting this out for now as to not kill requests for categorized bills
          if (!data.followed_bills || !Array.isArray(data.followed_bills)) {
            throw new Error("Invalid response format");
          }
          
          setBills(data.followed_bills);
        })
        .catch((err) => {
          console.error("Error fetching followed bills:", err);
        })
        .finally(() => setLoading(false));
    }
    catch(err) {
      toaster.create({
          title: 'message',
          description: 'Sign in to view followed bills',
          type: 'info',
          duration: 3000,
          meta: { closable: true },
      })
    }
  }; 
  
  // Fetch data on mount
  useEffect(() => {
    fetchFollowedBills();
  }, []);

  useEffect(() => {
    const param = selectedCategories.join(",")
    setUrl(followedBillsURL + "?categories=" + encodeURIComponent(param))
  }, [selectedCategories]);

  return (
    <Box>
      <HStack my={2}>
        <Heading color="var(--chakra-colors-gray-900)" _dark={{ color: "white" }}>
          Bills from Followed Reps
        </Heading>

        <IconButton
          variant="ghost"
          colorScheme="teal"
          size="sm"
          onClick={fetchFollowedBills}
          aria-label="Refresh Followed Bills">
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

export default FollowedBills;

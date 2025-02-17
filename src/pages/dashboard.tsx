// Dashboard.tsx
import React from "react";
import { Box, Button, HStack, Text, Grid, GridItem, Image } from "@chakra-ui/react";
import BillCard from "../components/bill-card"
import DetailBillCard from "../components/bill-card-detailed"
import RefreshButton from "../assets/refresh.png"

//temp impotrs for testing
import BillboardLogo from "../assets/mike.jpg"
//TODO (pathmapping in tsconfig.json)

const bills = [
  {code: "HR.16610", title: "Affordable Care Act of 2025", sponsor: "Joseph Robinette Biden", action: "passed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sponsorImg: BillboardLogo
  },
  {code: "HR.16610", title: "Affordable Care Act of 2025", sponsor: "Joseph Robinette Biden", action: "passed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sponsorImg: BillboardLogo
  },
  {code: "HR.16610", title: "Affordable Care Act of 2025", sponsor: "Joseph Robinette Biden", action: "passed",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    sponsorImg: BillboardLogo
  }
]

// Refresh Handler
const handleRefresh = () => {
  console.log("Refreshed");
};

const Dashboard = () => {
  return (
    <>
      {/* Header */}
      <HStack justify="space-between" mb={6}>
        <Text fontSize="3xl" fontWeight="bold">
          BillBoard Dashboard
        </Text>
        <HStack gap={4}>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Dashboard
          </Button>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Messages
          </Button>
          <Button variant="ghost" colorScheme="teal" size="sm">
            Profile
          </Button>
        </HStack>
      </HStack>

      {/* Recommended Bills */}
      {/* Bills Section */}
      <Box mb={6}>
        <HStack justify="space-between" w="full">
          <Text fontSize="xl" fontWeight="bold" mb={4}>
            Recommended Bills
          </Text>
          <Image
            src={RefreshButton} // Replace with your refresh image URL or path
            alt="Refresh"
            boxSize="24px"                         // Adjust size as needed
            cursor="pointer"                       // Indicates that the image is clickable
            onClick={handleRefresh}                // Handles the refresh action
            _hover={{ opacity: 0.8 }}              // Optional: Adds a hover effect
          />
        </HStack>

        <Grid autoRows="auto" templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
            <DetailBillCard 
                code={bills[1].code} 
                title={bills[1].title} 
                sponsor={bills[1].sponsor} 
                action={bills[1].action}
                description={bills[1].description}
                sponsorImg={bills[1].sponsorImg}
            />
            {bills.map((bill, index) => (
              <BillCard 
                code={bill.code} 
                title={bill.title} 
                sponsor={bill.sponsor} 
                action={bill.action}
                description={bill.description}
                sponsorImg={bill.sponsorImg}
              />
            ))}
        </Grid>
      </Box>

      {/* Trending Bills Section */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Trending Bills
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(350px, 1fr))" gap={6}>
          <GridItem bg="gray.700" p={6} borderRadius="lg" boxShadow="md">
            <Text fontWeight="bold">Healthcare Reform Act</Text>
            <Text mt={2} fontSize="sm">
              This bill is currently the most debated with extensive discussions
              around its potential impact on national healthcare.
            </Text>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
export default Dashboard;

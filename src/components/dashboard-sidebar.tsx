import { VStack, Text, Box, Button, SelectTrigger, SelectValueText, SelectRoot, SelectContent, createListCollection, SelectItem } from "@chakra-ui/react";
import { useState } from "react";
import ThemeToggle from "@/components/themetoggle";


const categories = createListCollection({
  items: [
    { label: "Technology", value: "tech" },
    { label: "Environment", value: "environment" },
    { label: "Healthcare", value: "health" },
    { label: "Economy", value: "econ" },
    { label: "All",     value: "all "}
  ],
  })
  
const DashboardSidebar = () => {
  return (
    <Box
      position="sticky"  // Keeps it in place while scrolling
      top="0"            // Sticks to the top of the viewport
      left="0"
      h="95vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRightWidth="medium"
      zIndex="1000"        // Keeps it above other elements
    >
      {/* Categories */}
      <Box borderRightWidth="medium">
      <VStack align="start" p={4} w="270px"  h="full">
        <Text fontWeight="bold" mb={2}> Categories </Text>
        <SelectRoot multiple collection={categories} size="md" width="250px">
          <SelectTrigger >
            <SelectValueText placeholder="Select Cateogry"  />         
          </SelectTrigger>
          <SelectContent>
            {categories.items.map((category) => (
              <SelectItem item={category} key={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
  
      </VStack>
  
    </Box>

      {/* Dark Mode Toggle Button */}
      <Box p={10}>
        <ThemeToggle />
      </Box>
    </Box>
  );
};


  

export default DashboardSidebar;

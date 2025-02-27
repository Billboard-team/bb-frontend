import { VStack, Text, Box, 
  createListCollection,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { useState } from "react";


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

);
};

export default DashboardSidebar;

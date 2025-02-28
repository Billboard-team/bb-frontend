import { VStack, Text, Box, Button, SelectTrigger, SelectValueText, SelectRoot, SelectContent, createListCollection, SelectItem } from "@chakra-ui/react";
import ThemeToggle from "@/components/themetoggle";
import { useFilters } from "./filter-context";
import { BillType, Congress } from "./type";

const billType : Array<BillType> = ["HR", "S", "SRES", "SJRES"];
const billCongress :Array<Congress> = [119, 118, 117];

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
  // Track selected items for each category separately
  const { selectedTypes, selectedCongress, toggleTypeSelection, toggleCongressSelection } = useFilters();

  return (
    <Box
      position="sticky" // Keeps it in place while scrolling
      top="0" // Sticks to the top of the viewport
      left="0"
      h="95vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      borderRightWidth="medium"
      zIndex="1000" // Keeps it above other elements
    >
      {/* Categories */}
      <VStack align="start" p={4} w="200px">
        <Text fontWeight="bold" mb={2}> Bill Types </Text>
        {billType.map((item) => (
          <Button
            key={item}
            justifyContent="start"
            w="150px"
            variant={selectedTypes.includes(item) ? "subtle" : "ghost"}
            colorPalette={selectedTypes.includes(item) ? "teal" : "bg"}
            onClick={() => {
              toggleTypeSelection(item);
              console.log("Selected Types:", selectedTypes);
            }}
          >
            {item}
          </Button>
        ))}
        <Text fontWeight="bold" mb={2}> Congress </Text>
        {billCongress.map((item) => (
          <Button
            key={item}
            justifyContent="start"
            w="150px"
            variant={selectedCongress.includes(item) ? "subtle" : "ghost"}
            colorPalette={selectedCongress.includes(item) ? "teal" : "bg"}
            onClick={() => {
              toggleCongressSelection(item);
              console.log("Selected Congress:", selectedCongress);
            }}
          >
            {item}
          </Button>
        ))}
        <Text fontWeight="bold" mb={2}> Categories </Text>
        <SelectRoot multiple collection={categories} size="md" width="175px">
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
      {/* Dark Mode Toggle Button */}
      <Box p={10}>
        <ThemeToggle />
      </Box>
    </Box>
  );
};


  

export default DashboardSidebar;

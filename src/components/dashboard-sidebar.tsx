import { VStack, Text, Box, Button, createListCollection } from "@chakra-ui/react";
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
    { label: "Education",     value: "education"}
  ],
  })
  
const DashboardSidebar = () => {
  // Track selected items for each category separately
  const { selectedTypes, selectedCongress, selectedCategories, toggleTypeSelection, toggleCongressSelection, toggleCategorySelection } = useFilters();

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
        <Text fontWeight="bold" mb={2} color="bg.inverted">
          {" "}
          Bill Types{" "}
        </Text>
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
        <Text fontWeight="bold" mb={2} color="bg.inverted">
          {" "}
          Congress{" "}
        </Text>
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

        <Text fontWeight="bold" mb={2} color="bg.inverted">
          {" "}
          Categorires{" "}
        </Text>
        {categories.items.map((item) => (
          <Button
            key={item.value}
            justifyContent="start"
            w="150px"
            variant={selectedCategories.includes(item.value) ? "subtle" : "ghost"}
            colorPalette={selectedCategories.includes(item.value) ? "teal" : "bg"}
            onClick={() => {
              toggleCategorySelection(item.value);
              console.log("Selected Categories:", selectedCongress);
            }}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
      {/* Dark Mode Toggle Button */}
      <Box p={10}>
        <ThemeToggle />
      </Box>
    </Box>
  );
};


  

export default DashboardSidebar;

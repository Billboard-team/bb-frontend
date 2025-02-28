import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import ThemeToggle from "@/components/themetoggle";

const categories = ["Technology", "Environment", "Healthcare", "Economy"];

const DashboardSidebar = () => {
  const [selected, setSelected] = useState(-1);

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
          Categories{" "}
        </Text>
        {categories.map((item, index) => (
          <Button
            justifyContent="start"
            w="150px"
            key={index}
            colorScheme={index === selected ? "teal" : "gray"}
            variant="ghost"
            onClick={() => setSelected(index)}
          >
            {item}
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

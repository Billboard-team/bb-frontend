import { VStack, Text, Box, Button } from "@chakra-ui/react";
import { useState } from "react";
import ThemeToggle from "@/components/themetoggle"
const categories = ["Technology", "Environment", "Healthcare", "Economy"];

const DashboardSidebar = () => {
  const [selected, setSelected] = useState(-1);

  return (
    <Box borderRightWidth="medium" h="100vh" display="flex" flexDirection="column" justifyContent="space-between">
      {/* Categories */}
      <VStack align="start" p={4} w="200px">
        <Text fontWeight="bold" mb={2}> Categories </Text>
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
      <Box p={4}>
        <ThemeToggle />
      </Box>
    </Box>
  );
};

export default DashboardSidebar;
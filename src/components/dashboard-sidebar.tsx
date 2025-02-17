import { VStack, Text, Box, For, Button } from "@chakra-ui/react";
import { useState } from "react";

const categories = ["Technology", "Environment", "Healthcare", "Economy"];

const DashboardSidebar = () => {
  const [selected, setSelected] = useState(-1)

  return (
    <Box borderRightWidth="medium">
      <VStack align="start" p={4} w="200px"  h="full">
        <Text fontWeight="bold" mb={2}> Categories </Text>
        <For each={categories}>
          {(item, index) => 
            <Button 
              justifyContent="start" 
              w="150px" 
              key={index} 
              colorPalette={index === selected ? "teal" : "bg"}
              variant="subtle"
              onClick={()=> {setSelected(index)}}
            >
              {item}
            </Button>
          }
        </For>
      </VStack>
    </Box>
  );
};

export default DashboardSidebar;

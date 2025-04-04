import { Box, Heading, Text, Link, Stack, VStack, HStack, IconButton, Color, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuCircleCheckBig, LuShare } from "react-icons/lu";
import { useState } from "react";
import { Cosponsor } from "@/components/type";
import BillGrid from "./bill-grid";

const CongressMemberDetailed = ({ member }: { member: Cosponsor}) => {
  

  /**
   * To keep it simple, for now it only lists full name, and cosponsored bills.
   * With information given to us, we can eventually
   * imageurl
   * party history
   * voting history
   * etc
   */

  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  const [shareClicked, setShareClicked] = useState(false)


  return (
    <Box 
      p={5} 
      shadow="lg" 
      borderWidth="1px" 
      borderRadius="lg" 
      bg={bgColor}
      color={textColor}
    >
      <VStack align="stretch" gap={4}>
        <Box textAlign="center">
          <Image 
            src={member.imageurl} 
            alt={member.full_name} 
            borderRadius="full" 
            boxSize="100px" 
            mx="auto" 
          />
          <Heading fontSize="xl" mt={3}>{member.full_name}</Heading>
          <Text fontSize="sm" color={subTextColor}>
            ({member.party}-{member.state})
          </Text>
        </Box>
        <HStack justifyContent="space-between">
          <Box pt={4}>
            <Text fontWeight="bold" display="inline" mr={2}>Cosponsored Bills</Text>
            <BillGrid items={member.cosponsored_bills} /> 
          </Box>

          <IconButton 
            variant={shareClicked ? "outline" : "solid"} // Chakra UI-supported values
            colorScheme={shareClicked ? "green" : "gray"} // Correct color prop
            onClick={() => {
              navigator.clipboard.writeText(location.href);
              setShareClicked(true);
            }
            }>
            {shareClicked ? <LuCircleCheckBig/> : <LuShare/>}
          </IconButton>
          

        </HStack>
      </VStack>
    </Box>
  );
};

export default CongressMemberDetailed;

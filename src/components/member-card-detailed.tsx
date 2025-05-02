import { Box, Heading, Text, Link, Stack, VStack, HStack, IconButton, Color, Image } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuCircleCheckBig, LuClipboardPlus } from "react-icons/lu";
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


  console.log(member.cosponsored_bills)
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
        <Box textAlign="left">
        <Image 
          src={member.image_url} 
          alt={member.full_name} 
          borderRadius="xl"
          border="4px solid"
          borderColor={
            member.party === "D" ? "blue.300" :
            member.party === "R" ? "red.300" :
            "gray.300"
          }
          boxSize="140px" 
          height="150px" 
          mx="0" 

        />
          <Heading fontSize="xl" mt={3}>{member.full_name}</Heading>
          <Text fontSize="sm" color={subTextColor}>
            ({member.party === "D" ? "Democrat" : member.party === "R" ? "Republican" : "Independent"}-{member.state})
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
            {shareClicked ? <LuCircleCheckBig/> : <LuClipboardPlus/>}
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  );
};

const partyMap = {
  "D": "Democrat",
  "R": "Republican",
  "I": "Independent"
};

export default CongressMemberDetailed;

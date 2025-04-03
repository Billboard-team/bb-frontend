import { Box, Heading, Text, Link, Stack, VStack, HStack, IconButton, Color } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import SummaryCard from "./summary-card";
import { LuCircleCheckBig, LuShare } from "react-icons/lu";
import { useState } from "react";
import { BillCardProp } from "@/components/type"
import { useNavigate } from "react-router";
import { FaMousePointer } from "react-icons/fa";

const BillCardDetailed = ({ bill }: { bill: BillCardProp }) => {
  
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.700");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");

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
        <Box>
          <Heading fontSize="xl">{bill.title || "Currently Unavailable"}</Heading>
          <Text fontSize="sm" color={subTextColor}>
            Bill Number: {bill.bill_type + " " + bill.bill_number || "N/A"} | Congress: {bill.congress || "N/A"}
          </Text>
        </Box>

        <Stack gap={3}>
          <Text fontWeight="bold">Status:</Text>
          <Text>{bill.action || "Currently Unavailable"}</Text>

          <Text fontWeight="bold">Action Date:</Text>
          <Text>{bill.action_date || "Currently Unavailable"}</Text>

          <SummaryCard id={bill.bill_id}/>

          <Text fontWeight="bold">Description:</Text>
          <Text>{bill.description || "Currently Unavailable"}</Text>

          <Text fontWeight="bold">Cosponsors</Text>
          {bill.cosponsors && bill.cosponsors.length > 0 ? (
          <Stack>
            {bill.cosponsors.map((cosponsor) => (
              <Text 
                textDecoration={"underline"}
                key={cosponsor.bioguide_id} 
                color={"lightblue"}
                _hover={{cursor: "pointer", color: "blue.400"}}
                transition={"0.4s"}
                onClick={() => navigate(`/member/${cosponsor.bioguide_id}`)}
              >
                  {cosponsor.full_name} ({cosponsor.party}-{cosponsor.state})
              </Text>
            ))}
          </Stack>
        ) : (
          <Text>Currently Unavailable</Text>
        )}
        </Stack>

        <HStack justifyContent="space-between">
          <Box pt={4}>
            <Text fontWeight="bold" display="inline" mr={2}>More Information:</Text>
            <Link 
              href={bill.url} 
              target="_blank" 
              rel="noopener noreferrer"
              color={linkColor}
              as="a"
            >
              View Full Bill Text
            </Link>
          </Box>

          <IconButton 
            variant={shareClicked ? "outline" : "surface"}
            colorPalette={shareClicked ? "green": "bg"}
            onClick={() => {
              navigator.clipboard.writeText(location.href)
              setShareClicked(true)
            }
            }>
            {shareClicked ? <LuCircleCheckBig/> : <LuShare/>}
          </IconButton>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BillCardDetailed;

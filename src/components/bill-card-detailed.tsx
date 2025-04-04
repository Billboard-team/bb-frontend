import { Box, Heading, Text, Link, Stack, VStack, HStack, IconButton, Avatar, Button } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";
import SummaryCard from "./summary-card";
import { LuCircleCheckBig, LuShare } from "react-icons/lu";
import { useState } from "react";
import { BillCardProp } from "@/components/type"
import { useNavigate } from "react-router";

const BillCardDetailed = ({ bill }: { bill: BillCardProp }) => {
  
  const navigate = useNavigate();
  const bgColor = useColorModeValue("white", "gray.900");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");

  const [shareClicked, setShareClicked] = useState(false)

  const [expanded, setExpanded] = useState(false);
  // Determine how many cosponsors to show
  const initialDisplay = 3;
  const cosponsorsToShow = expanded ? bill.cosponsors : bill.cosponsors?.slice(0, initialDisplay);
  const hasMoreToShow = bill.cosponsors && bill.cosponsors.length > initialDisplay;
  
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
          <HStack justify="space-between">
            <Stack>
            <Text fontWeight="bold">Cosponsors</Text>
              {bill.cosponsors && bill.cosponsors.length > 0 ? (
                <Stack>
                  {cosponsorsToShow!.map((cosponsor) => (
                    <HStack key={cosponsor.bioguide_id} gap="4">
                        <Avatar.Root onClick={() => navigate(`/member/${cosponsor.bioguide_id}`)} cursor="pointer" py={1}>
                          <Avatar.Fallback name={cosponsor.full_name} />
                          <Avatar.Image src={cosponsor.image_url} />
                        </Avatar.Root>
                        <Stack gap="0">
                          <Text fontWeight="medium">{cosponsor.full_name}</Text>
                        </Stack>
                    </HStack>
                  ))}
                  {hasMoreToShow && (
                    <Button 
                      variant="subtle" 
                      size="sm" 
                      onClick={() => setExpanded(!expanded)}
                      alignSelf="flex-start"
                    >
                      {expanded ? "See Less" : `See More...`}
                    </Button>
                  )}
                </Stack>
              ) : (
                  <Text>Currently Unavailable</Text>
                )}
            </Stack>

              <Stack>
                <Text fontWeight="bold">Status:</Text>
                <Text>{bill.action || "Currently Unavailable"}</Text>
                <Text fontWeight="bold">Action Date:</Text>
                <Text>{bill.action_date || "Currently Unavailable"}</Text>
              </Stack>

          </HStack>

          <SummaryCard id={bill.bill_id}/>

          <Text fontWeight="bold">Description:</Text>
          <Text>{bill.description || "Currently Unavailable"}</Text>

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

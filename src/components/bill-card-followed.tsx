import { Badge, Card, Button, Stack, HStack, Avatar } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { BillCardProp } from "@/components/type";

//essentially this is a bill card where the sponsors section lists any sponsors the user follows.
export default function BillCardFollowed({item}: {item: BillCardProp}) {

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const maxLength = 30; // Set max character length before truncation
  const shouldTruncate = item?.action.length > maxLength;
  const initialDisplay = 3;
  
  const cosponsorsToShow = expanded ? item.cosponsors : item.cosponsors?.slice(0, initialDisplay);
  const displayedText = isExpanded || !shouldTruncate ? item.action : item.action.slice(0, maxLength) + "...";
  const hasMoreToShow = item.cosponsors && item.cosponsors.length > initialDisplay;

  return (
    <Card.Root 
      width="full" 
      _hover={{backgroundColor: "blackAlpha.100", cursor: "pointer"}}
      onClick={() => navigate(`/post/${item.bill_id}`)} // Changed to use the unique identifier instead of code since that may not be unique
    >
      {/* Header with relative positioning to allow absolute positioning for the image */}
      <Card.Header position="relative">
        <Card.Description fontSize="sm">{item.bill_type + "-" + item.bill_number || "N/A"} | Congress: {item.congress || "N/A"}</Card.Description>
      </Card.Header>

      <Card.Body gap="3">
        <Card.Title mt="3" fontSize="3xl">
          {item.title}
        </Card.Title>
        <Card.Description>
            Sponsors
            <Stack>
                {cosponsorsToShow!.map((cosponsor) => (
                <HStack key={cosponsor.bioguide_id} gap="4">
                    <Avatar.Root onClick={() => navigate(`/member/${cosponsor.bioguide_id}`)} cursor="pointer" py={1}>
                        <Avatar.Fallback name={cosponsor.full_name} />
                        <Avatar.Image src={cosponsor.image_url} />
                    </Avatar.Root>
                    <text>{cosponsor.full_name}</text>
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

        </Card.Description>

        <Card.Description>Description: {item.description || "Not Available"}</Card.Description>
      </Card.Body>
      
      <Card.Footer justifyContent="flex-end" display="flex" flexDirection="column" alignItems="flex-end" flexWrap="wrap">
        <Badge bg="green.500" color="white" fontSize="10" px={2} py={1} borderRadius="md" whiteSpace="normal" overflowWrap="break-word">
          {displayedText}
        </Badge>
        {shouldTruncate && (
          <Button
            variant="ghost"
            color="green.500"
            fontSize="sm"
            ml={1}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event
              setIsExpanded(!isExpanded);
            }}
          >
            {isExpanded ? "Show less" : "Read more"}
          </Button>
        )}
      </Card.Footer>

    </Card.Root>
  );

  //TODO: Change footer badge to change based on status of bill.
}

import { Badge, Card, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"; 
import { useState } from "react";
import { BillCardProp } from "@/components/type";

export default function BillCard({item}: {item: BillCardProp}) {

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const maxLength = 30; // Set max character length before truncation
  const shouldTruncate = item?.action.length > maxLength;
  const displayedText = isExpanded || !shouldTruncate ? item.action : item.action.slice(0, maxLength) + "...";

  return (
    <Card.Root 
      width="70vw" 
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
        <Card.Description>Sponsor: {item.sponsor || "Not Available"}</Card.Description>
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

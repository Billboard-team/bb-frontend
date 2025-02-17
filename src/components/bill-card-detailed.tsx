import { Badge, Card, Box, Image } from "@chakra-ui/react"
 
type BillDetails = Record<"code" | "title", string>;

export interface BillCardProp extends BillDetails{
  sponsor?: string,
  action: string,
  description?: string,
  sponsorImg?: string
}

// function BillActionBadge({action} : ItemBillProp) {

// }

export default function BillCard({code, title, sponsor, action, description, sponsorImg }: BillCardProp) {
  return (
    <Card.Root width="50rem">
      {/* Header with relative positioning to allow absolute positioning for the image */}
      <Card.Header position="relative">
        <Card.Title fontSize="sm">{code}</Card.Title>
        
        {/* If an image is provided, display it in the top-right */}
        {sponsorImg && (
          <Box
            position="absolute"
            top="2"
            right="3"
            width="125px"      
            height="80px"     
            borderRadius="md"
            overflow="hidden"
          >
            {/* The image with a grey filter */}
            <Image
              src={sponsorImg}
              alt={title}
              width="100%"
              height="100%"
              objectFit="cover"
              filter="grayscale(75%)" 
            />
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgGradient="linear(to-b, rgba(128,128,128,0.75), rgba(128,128,128,1))"
              pointerEvents="none" 
            />
          </Box>
        )}
      </Card.Header>

      <Card.Body gap="3">
        <Card.Title mt="3" fontSize="3xl">
          {title}
        </Card.Title>
        <Card.Description>Sponser: {sponsor}</Card.Description>
        <Card.Description>{description}</Card.Description>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Badge colorPalette="green">{action}</Badge>
      </Card.Footer>
    </Card.Root>
  );

  //TODO: Change footer badge to change based on status of bill.
}

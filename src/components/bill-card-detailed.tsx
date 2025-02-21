import { Badge, Card, Box, Image } from "@chakra-ui/react"
 
export interface BillCardProp {
  /** Plaintext title of bill (act name) */
  title: string,
  /** Bill code (HR. 40, SR. 121h, etc) */
  code: string,
  /** Main sponser of bill (optional) */
  sponsor?: string,
  /** Current level of action on bill (passed, suspended, etc) */
  action: string,
  /** Summary of bill (not full description) */
  description?: string,
  /** Provided url to image of bill sponsor (optional) */
  sponsorImg?: string
}



export default function BillCard({item}: {item: BillCardProp}) {
  return (
    <Card.Root width="80vw" height="35rem">
      {/* Header with relative positioning to allow absolute positioning for the image */}
      <Card.Header position="relative">
        <Card.Title fontSize="l">{item.code}</Card.Title>
        
        {/* If an image is provided, display it in the top-right */}
        {item.sponsorImg && (
          <Box
            position="absolute"
            top="2"
            right="3"
            width="150px"      
            height="100px"     
            borderRadius="md"
            overflow="hidden"
          >
            {/* The image with a grey filter */}
            <Image
              src={item.sponsorImg}
              alt={item.title}
              width="100%"
              height="100%"
              objectFit="cover"
            />
            {/* Gradient overlay */}
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              width="100%"
              height="100%"
              bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
              zIndex="1"
              pointerEvents="none" 
            />
          </Box>
        )}
      </Card.Header>

      <Card.Body gap="3">
        <Card.Title mt="3" fontSize="3xl">
          {item.title}
        </Card.Title>
        <Card.Description>Sponser: {item.sponsor}</Card.Description>
        <Card.Description>{item.description}</Card.Description>
      </Card.Body>

      <Card.Footer justifyContent="flex-end">
        <Badge colorPalette="green">{item.action}</Badge>
      </Card.Footer>
    </Card.Root>
  );

  //TODO: Change footer badge to change based on status of bill.
}

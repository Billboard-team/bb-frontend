import { Box, Heading, Text, Link, Stack, VStack } from "@chakra-ui/react";
import { useColorModeValue } from "@/components/ui/color-mode";

interface BillCardProps {
  bill: {
    bill_id: number;
    title: string;
    action: string;
    action_date: string;
    description: string;
    congress: number;
    bill_type: string;
    bill_number: string;
    summary?: string | null;
    text?: string | null;
    url: string;
  };
}

const BillCardDetailed = ({ bill }: { bill: BillCardProps["bill"] }) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "whiteAlpha.900");
  const subTextColor = useColorModeValue("gray.500", "gray.400");
  const linkColor = useColorModeValue("blue.500", "blue.300");

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

          <Text fontWeight="bold">Description:</Text>
          <Text>{bill.description || "Currently Unavailable"}</Text>

          <Text fontWeight="bold">Summary:</Text>
          <Text>{bill.summary || "Currently Unavailable"}</Text>
        </Stack>

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
      </VStack>
    </Box>
  );
};

export default BillCardDetailed;




/*
 *  Commented out below codes since more informations are needed for the bill details page
 */


// export interface BillCardProp {
//   /** Plaintext title of bill (act name) */
//   title: string,
//   /** Bill code (HR. 40, SR. 121h, etc) */
//   code: string,
//   /** Main sponser of bill (optional) */
//   sponsor?: string,
//   /** Current level of action on bill (passed, suspended, etc) */
//   action: string,
//   /** Summary of bill (not full description) */
//   description?: string,
//   /** Provided url to image of bill sponsor (optional) */
//   sponsorImg?: string
// }


// export default function BillCard({item}: {item: BillCardProp}) {
//   return (
//     <Card.Root width="80vw" height="35rem">
//       {/* Header with relative positioning to allow absolute positioning for the image */}
//       <Card.Header position="relative">
//         <Card.Title fontSize="l">{item.code}</Card.Title>
        
//         {/* If an image is provided, display it in the top-right */}
//         {item.sponsorImg && (
//           <Box
//             position="absolute"
//             top="2"
//             right="3"
//             width="150px"      
//             height="100px"     
//             borderRadius="md"
//             overflow="hidden"
//           >
//             {/* The image with a grey filter */}
//             <Image
//               src={item.sponsorImg}
//               alt={item.title}
//               width="100%"
//               height="100%"
//               objectFit="cover"
//             />
//             {/* Gradient overlay */}
//             <Box
//               position="absolute"
//               top="0"
//               left="0"
//               right="0"
//               bottom="0"
//               width="100%"
//               height="100%"
//               bgGradient="linear(to-r, gray.300, yellow.400, pink.200)"
//               zIndex="1"
//               pointerEvents="none" 
//             />
//           </Box>
//         )}
//       </Card.Header>

//       <Card.Body gap="3">
//         <Card.Title mt="3" fontSize="3xl">
//           {item.title}
//         </Card.Title>
//         <Card.Description>Sponser: {item.sponsor}</Card.Description>
//         <Card.Description>{item.description}</Card.Description>
//       </Card.Body>

//       <Card.Footer justifyContent="flex-end">
//         <Badge colorPalette="green">{item.action}</Badge>
//       </Card.Footer>
//     </Card.Root>
//   );

//   //TODO: Change footer badge to change based on status of bill.
// }

import { Badge, Card } from "@chakra-ui/react"
 
export interface BillCardProp {
  code: string,
  title: string,
  sponsor: string,
  action: string
}

// function BillActionBadge({action} : ItemBillProp) {

// }

export default function BillCard({item}: {item: BillCardProp}) {
  return (
    <Card.Root width="320px">
      <Card.Header>
        <Card.Title fontSize='sm'>{item.code}</Card.Title>
      </Card.Header>
      <Card.Body gap="2">
        <Card.Title mt="2">{item.title}</Card.Title>
        <Card.Description>{item.sponsor}</Card.Description>
        <Card.Description>
          This is the card body. Lorem ipsum dolor sit amet, consectetur
          adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
          Curabitur nec odio vel dui euismod fermentum.
        </Card.Description>
      </Card.Body>
      <Card.Footer justifyContent="flex-end">
        <Badge colorPalette="green">{item.action}</Badge>
      </Card.Footer>
    </Card.Root>
  )
}

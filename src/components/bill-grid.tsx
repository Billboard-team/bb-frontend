import { Grid } from "@chakra-ui/react";
import BillCard, { BillCardProp } from "@/components/bill-card";

interface BillItemProp {
  id: number,
  item: BillCardProp,
}

export default function BillGrid({items} : {items : BillItemProp[]}) {
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap="3">
      {items.map(data => (
        <BillCard 
          key={data.id}
          item={{
            ...data.item,
            id: data.id
          }}
        />
      ))}
    </Grid>
  )
}


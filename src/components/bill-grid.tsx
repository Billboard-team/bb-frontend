import { Grid } from "@chakra-ui/react";
import BillCard from "@/components/bill-card";
import { BillCardProp } from "@/components/type";

interface BillItemProp {
  id: number,
  item: BillCardProp,
}

export default function BillGrid({items} : {items : BillCardProp[]}) {
  return (
    <Grid templateColumns="repeat(1, 1fr)" gap="3">
      {items.map(data => (
        <BillCard 
          key={data.bill_id}
          item={data}
        />
      ))}
    </Grid>
  )
}


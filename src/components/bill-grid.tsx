import { Grid } from "@chakra-ui/react";
import BillCard from "@/components/bill-card";
import { BillCardProp } from "@/components/type";
import { useFilters } from "@/components/filter-context";

export default function BillGrid({items} : {items : BillCardProp[]}) {

  const {selectedTypes, selectedCongress} = useFilters()
  // Filter bills based on selections
  const filteredBills = items.filter(bill => 
    (selectedTypes.length === 0 || selectedTypes.includes(bill.bill_type)) &&
    (selectedCongress.length === 0 || selectedCongress.includes(bill.congress))
  );

  return (
    <Grid templateColumns="repeat(1, 1fr)" gap="3">
      {filteredBills.map(data => (
        <BillCard 
          key={data.bill_id}
          item={data}
        />
      ))}
    </Grid>
  )
}


import { Grid, Portal, Select, Stack, createListCollection } from "@chakra-ui/react";
import RepCard from "@/components/rep-card";
import { CosponsorCardProp } from "@/components/type";


export default function MemberGrid({items} : {items : CosponsorCardProp[]}) {

  // filter congress members based on state

  return (
    <Stack>
    <Select.Root collection={states} size="sm" width="320px">
      <Select.HiddenSelect />
      <Select.Label>Filter by State</Select.Label>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder="Select State" />
        </Select.Trigger>
        <Select.IndicatorGroup>
          <Select.Indicator />
        </Select.IndicatorGroup>
      </Select.Control>
      <Portal>
        <Select.Positioner>
          <Select.Content>
            {states.items.map((state) => (
              <Select.Item item={state} key={state.value}>
                {state.label}
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Portal>
    </Select.Root>

    <Grid templateColumns="repeat(3, 1fr)" gap={3}>
      {items.map((data) => (
        <RepCard item={data} key={data.bioguide_id} />
      ))}
    </Grid>
  </Stack>
  )
}

const states = createListCollection({
  items:[
    { label: "Alabama", value: "alabama" },
    { label: "Alaska", value: "alaska" },
    { label: "Arizona", value: "arizona" },
    { label: "Arkansas", value: "arkansas" },
    { label: "California", value: "california" },
    { label: "Colorado", value: "colorado" },
    { label: "Connecticut", value: "connecticut" },
    { label: "Delaware", value: "delaware" },
    { label: "Florida", value: "florida" },
    { label: "Georgia", value: "georgia" },
    { label: "Hawaii", value: "hawaii" },
    { label: "Idaho", value: "idaho" },
    { label: "Illinois", value: "illinois" },
    { label: "Indiana", value: "indiana" },
    { label: "Iowa", value: "iowa" },
    { label: "Kansas", value: "kansas" },
    { label: "Kentucky", value: "kentucky" },
    { label: "Louisiana", value: "louisiana" },
    { label: "Maine", value: "maine" },
    { label: "Maryland", value: "maryland" },
    { label: "Massachusetts", value: "massachusetts" },
    { label: "Michigan", value: "michigan" },
    { label: "Minnesota", value: "minnesota" },
    { label: "Mississippi", value: "mississippi" },
    { label: "Missouri", value: "missouri" },
    { label: "Montana", value: "montana" },
    { label: "Nebraska", value: "nebraska" },
    { label: "Nevada", value: "nevada" },
    { label: "New Hampshire", value: "new hampshire" },
    { label: "New Jersey", value: "new jersey" },
    { label: "New Mexico", value: "new mexico" },
    { label: "New York", value: "new york" },
    { label: "North Carolina", value: "north carolina" },
    { label: "North Dakota", value: "north dakota" },
    { label: "Ohio", value: "ohio" },
    { label: "Oklahoma", value: "oklahoma" },
    { label: "Oregon", value: "oregon" },
    { label: "Pennsylvania", value: "pennsylvania" },
    { label: "Rhode Island", value: "rhode island" },
    { label: "South Carolina", value: "south carolina" },
    { label: "South Dakota", value: "south dakota" },
    { label: "Tennessee", value: "tennessee" },
    { label: "Texas", value: "texas" },
    { label: "Utah", value: "utah" },
    { label: "Vermont", value: "vermont" },
    { label: "Virginia", value: "virginia" },
    { label: "Washington", value: "washington" },
    { label: "West Virginia", value: "west virginia" },
    { label: "Wisconsin", value: "wisconsin" },
    { label: "Wyoming", value: "wyoming" }
  ]
  
})

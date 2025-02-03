import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import ItemBill from './item-bill';

const item = {
  code: "S.5",
  title: "Laken Riley Act",
  sponsor: "Sen. Britt, Katie Boyd [R-AL]",
  action: "became law"
}

export default function ItemGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid size={8}>
          <ItemBill code={item.code} title={item.title} sponsor={item.sponsor} action={item.action}/>
        </Grid>
        <Grid size={4}>
          <ItemBill code={item.code} title={item.title} sponsor={item.sponsor} action={item.action}/>
        </Grid>
        <Grid size={4}>
          <ItemBill code={item.code} title={item.title} sponsor={item.sponsor} action={item.action}/>
        </Grid>
        <Grid size={8}>
          <ItemBill code={item.code} title={item.title} sponsor={item.sponsor} action={item.action}/>
        </Grid>
      </Grid>
    </Box>
  );
}

import { Card, CardContent, Typography } from "@mui/material"

export interface ItemBillProp {
  code: string,
  title: string,
  sponsor: string,
  action: string
}

export default function ItemBill( {code, title, sponsor, action}: ItemBillProp) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {code}
        </Typography>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {sponsor}
        </Typography>
        <Typography variant="body2">
          {action}
        </Typography>
      </CardContent>
    </Card>
  )
}

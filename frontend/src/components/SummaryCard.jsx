import { Card, CardContent, Typography } from "@mui/material";

function SummaryCard({ title, value }) {
  return (
    <Card
      sx={{
        width: 250,
        height: 130,
        borderRadius: 3,
        boxShadow: 3,
      }}
    >
      <CardContent>
        <Typography variant="h6">{title}</Typography>

        <Typography
          variant="h4"
          sx={{
            marginTop: 2,
            fontWeight: "bold",
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default SummaryCard;
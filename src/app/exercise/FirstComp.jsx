import { Card, Box } from "@mui/material";

const FirstComp = () => {
  return (
    <Card
      sx={{
        p: 2,
        color: "red",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          height: "100vh",
          width: "80vw",
          display: "flex",
          backgroundColor: "red",
        }}
      >
        <Box
          sx={{
            height: "40vh",
            width: "100%",
            display: "flex",
            backgroundColor: "blue",
            justifyContent: "center", // yatay ortalama
            alignItems: "center", // dikey ortalama
          }}
        >
          <Box
            sx={{
              height: "40vh",
              width: "20vw",
              backgroundColor: "yellow",
              borderRadius: "50%",
            }}
          >
            jfgjyguy
            <Box></Box>
          </Box>
        </Box>
      </Box>
    </Card>
  );
};
export default FirstComp;

import "./home-styles.css";
import { Container, Stack, Typography } from "@mui/material";
import ToggleDarkLight from "../../components/ToggleDarkLight";
import InputTodo from "../../components/InputTodo";
import ListTodo from "../../components/ListTodo";

function Home() {
  // console.log("render home");

  return (
    <>
      <div className="bg_app" />
      <Container maxWidth="md" sx={{ marginTop: "5rem" }}>
        <Stack spacing={2} direction={"row"} justifyContent={"space-between"}>
          <Typography
            variant="h2"
            component="h1"
            sx={{ letterSpacing: "1rem", fontWeight: "600", color: "#ffffff" }}>
            TODO
          </Typography>
          <ToggleDarkLight />
        </Stack>
        <InputTodo />
        <ListTodo />
      </Container>
    </>
  );
}

export default Home;

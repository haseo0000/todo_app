import { useDispatch } from "react-redux";
import { toggleTodo } from "../store/todoSlice";
import IconCheck from "../assets/images/icon-check.svg";
import { Box } from "@mui/material";

export function BoxCircle({ completed, id }: { completed: boolean; id: string }) {
  const dispatch = useDispatch();

  const styles = {
    cursor: "pointer",
    borderRadius: "50%",
    width: "25px",
    aspectRatio: "1",
    flexShrink: "0",
  };

  const completedStyle = {
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(-45deg, #aa78f5, #74b8fa)",
  };

  const inCompletedStyle = {
    border: "1px solid var(--text-clr)",
  };

  return (
    <Box
      component={"div"}
      onClick={() => dispatch(toggleTodo({ id }))}
      sx={{
        ...styles,
        ...(completed ? completedStyle : inCompletedStyle),
      }}>
      {completed && <img src={IconCheck} alt="IconCheck" />}
    </Box>
  );
}

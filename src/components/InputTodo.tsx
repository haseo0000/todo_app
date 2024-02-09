import { KeyboardEvent } from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { addTodo } from "../store/todoSlice";
import { useDispatch } from "react-redux";

export default function InputTodo() {
  console.log("render InputTodo");
  const dispatch = useDispatch();

  const [inputTodo, setInputTodo] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAddTodo = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (inputTodo.trim() === "") {
        setError("Must not be empty");
        return;
      }

      dispatch(addTodo(inputTodo));
      setError(null);
      setInputTodo("");
    }
  };

  return (
    <Box
      sx={{
        marginTop: "2rem",
        borderRadius: "5px",
        overflow: "hidden",
        boxShadow: "0 0 10px 1px var(--shadow-box-clr)",
      }}>
      <Box
        component="input"
        type="text"
        placeholder="Add Yours Todos..."
        value={inputTodo}
        onChange={(e) => setInputTodo(e.target.value)}
        onKeyDown={handleAddTodo}
      />
      <Box component="span" sx={{ color: "red", fontWeight: "bold" }}>
        {error}
      </Box>
    </Box>
  );
}

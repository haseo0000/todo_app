import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import { updateTodo } from "../../store/todoSlice";
import { Box, Container, Button, Stack, Typography } from "@mui/material";

function EditTodo() {
  console.log("render EditTodo");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { todos } = useSelector((state: RootState) => state.todo);

  const todoById = todos.find((todo) => todo.id === id);
  const [editInput, setEditInput] = useState(todoById?.title);
  const isHaveTodo = editInput?.trim();

  const handleUpdeteTodo = () => {
    if (!id) return;

    const editTodo = {
      id: id,
      title: editInput!,
    };

    dispatch(updateTodo({ editTodo }));
    navigate("/");
  };

  return (
    <Container maxWidth={"md"}>
      <Typography variant="h2">Edit Todo</Typography>
      <Box>
        <Box
          component={"input"}
          type="text"
          placeholder="Add some todo..."
          value={editInput}
          onChange={(e) => setEditInput(e.target.value)}
        />
        {!isHaveTodo && <Box sx={{ color: "red" }}>Must have todo</Box>}
      </Box>
      <Stack
        direction={"row"}
        marginTop={"1rem"}
        justifyContent={"space-between"}
        alignItems={"center"}
        spacing={2}>
        <Link to={"/"}>
          <Button variant="outlined">Back</Button>
        </Link>
        <Button onClick={handleUpdeteTodo} disabled={!isHaveTodo} variant="contained">
          Updated
        </Button>
      </Stack>
    </Container>
  );
}

export default EditTodo;

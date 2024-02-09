import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Stack, Pagination } from "@mui/material";
import { BoxCircle } from "./BoxCircle";
import { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, toggleTodo, clearCompletedTodo } from "../store/todoSlice";
import IconCross from "../assets/images/icon-cross.svg";
import styles from "./ListTodo-Styles.module.css";

type IFilterTodo = "All" | "Active" | "Completed";

function BoxCross({ id }: { id: string }) {
  const dispatch = useDispatch();

  return (
    <Box
      component={"div"}
      onClick={() => dispatch(removeTodo({ id }))}
      sx={{
        cursor: "pointer",
      }}>
      <img src={IconCross} alt="IconCross" />
    </Box>
  );
}

function ListTodo() {
  console.log("render listTodo");

  const boxListStyles = {
    display: "flex",
    justifyContent: "space-between",
    gap: "1rem",
    padding: "1rem",
    background: "var(--primary-clr)",
    borderBottom: "1px solid var(--secondary-clr)",
    position: "relative",
  };

  const dispatch = useDispatch();
  const ITEMPERPAGE = 5;
  const FILTER_TODO: IFilterTodo[] = ["All", "Active", "Completed"];

  const { todos } = useSelector((state: RootState) => state.todo);

  const [filterTodo, setFilterTodo] = useState<IFilterTodo>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const countPage = useRef(Math.ceil(todos.length / ITEMPERPAGE));

  const TodosItemsLeft = useMemo(() => {
    return todos.filter((todo) => !todo.completed);
  }, [todos]);

  const handleShowListTodo = () => {
    let newListTodos = todos;
    if (filterTodo === "Completed") {
      newListTodos = [...todos].filter((todo) => todo.completed);
    } else if (filterTodo === "Active") {
      newListTodos = [...todos].filter((todo) => !todo.completed);
    }

    countPage.current = Math.ceil(newListTodos.length / ITEMPERPAGE);

    const indexOfLastItem = currentPage * ITEMPERPAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMPERPAGE;

    return newListTodos.slice(indexOfFirstItem, indexOfLastItem);
  };

  const handleSetFilterTodo = (type: IFilterTodo) => {
    setCurrentPage(1);
    setFilterTodo(type);
  };

  const handleClearCompleted = () => {
    setCurrentPage(1);
    dispatch(clearCompletedTodo());
  };

  return (
    <>
      <Box sx={{ boxShadow: "0 0 10px 1px var(--shadow-box-clr)" }}>
        <Box sx={{ marginTop: "1rem", borderRadius: "5px 5px 0 0", overflow: "hidden" }}>
          {handleShowListTodo().map((todo) => (
            <Box sx={boxListStyles} key={todo.id}>
              <BoxCircle completed={todo.completed} id={todo.id} />
              <Typography
                component={"div"}
                onClick={() => dispatch(toggleTodo({ id: todo.id }))}
                className={`${todo.completed && styles.completed}`}
                sx={{
                  cursor: "pointer",
                  flexGrow: "1",
                }}>
                <Typography component={"span"}>
                  {todo.completed ? <s>{todo.title}</s> : <>{todo.title}</>}
                </Typography>
              </Typography>
              {!todo.completed && <Link to={`/edit/${todo.id}`}>Edit</Link>}
              <BoxCross id={todo.id} />
            </Box>
          ))}
        </Box>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{
            padding: "1rem",
            background: "var(--primary-clr)",
            fontSize: "0.8em",
            color: "#53536f",
            borderRadius: "0 0 5px 5px",
          }}>
          <Box component="span">{TodosItemsLeft.length} items left</Box>
          <Stack direction="row" spacing={2}>
            {FILTER_TODO.map((item) => (
              <Box
                key={item}
                className={`${styles.details_span} ${
                  filterTodo === item && styles.active
                }`}
                component="span"
                onClick={() => handleSetFilterTodo(item)}>
                {item}
              </Box>
            ))}
          </Stack>
          <Box
            className={styles.details_span}
            component="span"
            onClick={() => handleClearCompleted()}>
            Clear Completed
          </Box>
        </Stack>
      </Box>
      <Box
        sx={{
          marginTop: "1rem",
          background: "var(--primary-clr)",
          padding: "0.5rem",
          display: "flex",
          justifyContent: "flex-end",
          boxShadow: "0 0 10px 1px var(--shadow-box-clr)",
        }}>
        <Pagination
          count={countPage.current}
          page={currentPage}
          onChange={(_, page) => setCurrentPage(page)}
          variant="outlined"
          color="primary"
        />
      </Box>
    </>
  );
}

export default ListTodo;

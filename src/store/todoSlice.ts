import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface ITodos {
  id: string;
  title: string;
  completed: boolean;
}

interface IInitialState {
  todos: ITodos[];
}

const initialState: IInitialState = {
  todos: [
    { id: "1", title: "todo1", completed: false },
    { id: "2", title: "todo2", completed: false },
    { id: "3", title: "todo3", completed: true },
    { id: "4", title: "todo4", completed: true },
    { id: "5", title: "todo5", completed: true },
    { id: "6", title: "todo6", completed: true },
    { id: "7", title: "todo7", completed: true },
    { id: "8", title: "todo8", completed: true },
    { id: "9", title: "todo9", completed: true },
    { id: "10", title: "todo10", completed: true },
    { id: "11", title: "todo11", completed: true },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo = {
        id: uuidv4(),
        title: action.payload,
        completed: false,
      };

      state.todos = [...state.todos, newTodo];
    },
    toggleTodo: (state, action: PayloadAction<{ id: string }>) => {
      const toggleTodo = [...state.todos].map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      state.todos = toggleTodo;
    },
    removeTodo: (state, action: PayloadAction<{ id: string }>) => {
      const newTodo = [...state.todos].filter((todo) => todo.id !== action.payload.id);

      state.todos = newTodo;
    },
    clearCompletedTodo: (state) => {
      const newTodo = [...state.todos].filter((todo) => !todo.completed);

      state.todos = newTodo;
    },
    updateTodo: (
      state,
      action: PayloadAction<{ editTodo: { id: string; title: string } }>
    ) => {
      const updateTodo = [...state.todos].map((todo) => {
        if (todo.id === action.payload.editTodo.id) {
          return { ...todo, title: action.payload.editTodo.title };
        }
        return todo;
      });

      state.todos = updateTodo;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addTodo, toggleTodo, removeTodo, clearCompletedTodo, updateTodo } =
  todoSlice.actions;

export default todoSlice.reducer;

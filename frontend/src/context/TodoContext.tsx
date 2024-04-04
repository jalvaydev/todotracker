import { Todo } from "@/types";
import { createContext, useContext, useState } from "react";

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

interface TodoProviderProps {
  children: React.ReactNode;
}

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }

  return context;
};

export const TodoProvider = ({ children }: TodoProviderProps) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [idCount, setIdCount] = useState(1);

  const addTodo = (todo: Todo) => {
    const id = idCount;
    setIdCount((prevId) => prevId + 1);

    todo.id = id;
    setTodos([...todos, todo]);
  };

  const editTodo = (newTodo: Todo) => {
    let newTodos = [...todos];
    let index = newTodos.findIndex((todo) => todo.id === newTodo.id);
    newTodos[index] = newTodo;

    setTodos(newTodos);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo: Todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, removeTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

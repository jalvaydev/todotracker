import { Todo } from "@/types";
import axios from "axios";
import { createContext, useContext, useState } from "react";

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  editTodo: (newTodo: Todo) => void;
  removeTodo: (id: number) => void;
  useApi: boolean;
  setUseApi: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [useApi, setUseApi] = useState(false); 

  const fetchTodos = async () => {
  axios.get('/api/todos')
    .then(response => {
      setTodos(response.data);
    })
    .catch(error => {
      console.error('Failed to fetch todos:', error);
    });
};

  const addTodo = async (todo: Todo) => {
    if (useApi) {
      axios.post('/api/todo', todo)
        .then(() => {
          fetchTodos();
        })
        .catch(error => {
          console.error('Failed to add todo:', error);
        });
    } else {
      const id = idCount;
      setIdCount((prevId) => prevId + 1);

      todo.id = id;
      setTodos([...todos, todo]);
    }
  };

  const editTodo = async (newTodo: Todo) => {
    if (useApi) {
      axios.put(`/api/todo/${newTodo.id}`, newTodo)
      .then(() => {
        fetchTodos();
      })
      .catch(error => {
        console.error('Failed to edit todo:', error);
      });
    } else {
      let newTodos = [...todos];
      let index = newTodos.findIndex((todo) => todo.id === newTodo.id);
      newTodos[index] = newTodo;

      setTodos(newTodos);
    }
  };

  const removeTodo = async (id: number) => {
    if (useApi) {
      axios.delete(`/api/todo/${id}`)
      .then(() => {
        fetchTodos();
      })
      .catch(error => {
        console.error('Failed to remove todo:', error);
      });
    } else {
      setTodos(todos.filter((todo: Todo) => todo.id !== id));
    }
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, editTodo, removeTodo, useApi, setUseApi }}>
      {children}
    </TodoContext.Provider>
  );
};
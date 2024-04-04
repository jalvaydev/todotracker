import TodoListItem from "./TodoListItem";
import { useTodoContext } from "@/context/TodoContext";

function TodoList() {
  const { todos } = useTodoContext();

  return (
    <div className="max-h-[760px] px-5 overflow-y-auto overflow-x-hidden">
      {todos.length !== 0 ? (
        <ul role="list" className="divide-y divide-gray-100">
          {todos.map((todo) => (
            <div key={todo.id}>
              <li className="relative flex justify-between gap-x-6 py-5 hover:scale-[101%] hover:cursor-pointer">
                <TodoListItem todo={todo} />
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <div className="my-auto text-2xl font-bold leading-tight tracking-tight text-center text-primary">
          No todos have been added.
        </div>
      )}
    </div>
  );
}

export default TodoList;

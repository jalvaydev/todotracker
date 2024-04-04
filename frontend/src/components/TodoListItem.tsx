import { Todo } from "@/types";
import { Badge } from "./ui/badge";
import { Dialog, DialogTrigger } from "./ui/dialog";
import EditTodoDialog from "./EditTodoDialog";
import { useTodoContext } from "@/context/TodoContext";

interface TodoListItemProps {
  todo: Todo;
}

function TodoListItem({ todo }: TodoListItemProps) {
  const { editTodo } = useTodoContext();

  const handleCompleteTodo = (todo: Todo) => {
    editTodo({ ...todo, completed: !todo.completed });
  };

  return (
    <Dialog>
      <div className="flex min-w-0 gap-x-4">
        <input
          name="todoStatus"
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleCompleteTodo(todo)}
          className="z-10 h-6 w-6 rounded-full border-gray-300 my-auto text-indigo-600 focus:ring-indigo-600"
        />
        <div className="min-w-0 flex-auto ">
          <p className="text-sm text-left font-semibold leading-6 text-gray-900">
            <DialogTrigger>
              <span className="absolute inset-x-0 -top-px bottom-0" />
            </DialogTrigger>
            {todo.task}
          </p>
          <div className="text-left sm:hidden">
            {todo.completed ? (
              <Badge className="bg-emerald-500">Completed</Badge>
            ) : (
              <Badge variant="outline">Not Completed</Badge>
            )}
          </div>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-x-4">
        <div className="hidden sm:flex sm:flex-col sm:items-end">
          {todo.completed ? (
            <Badge className="bg-emerald-500">Completed</Badge>
          ) : (
            <Badge variant="outline">Not Completed</Badge>
          )}
        </div>
      </div>
      <EditTodoDialog todo={todo} />
    </Dialog>
  );
}

export default TodoListItem;

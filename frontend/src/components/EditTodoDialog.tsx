import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Todo } from "@/types";
import { useState } from "react";
import { useTodoContext } from "@/context/TodoContext";

interface EditTodoDialogProps {
  todo: Todo;
}

function EditTodoDialog({ todo }: EditTodoDialogProps) {
  const { editTodo, removeTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState(todo);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    newTodo.completed = todo.completed;
    newTodo.photoFile = photoFile ? photoFile : todo.photoFile;
    editTodo(newTodo);
    setPhotoFile(null);
  }

  return (
    <DialogContent className="sm:max-w-xl">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(e);
        }}
      >
        <DialogHeader>
          <DialogTitle>Edit todo</DialogTitle>
          <DialogDescription>
            Make changes to your todo here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="task" className="text-right">
              Task
            </Label>
            <Input
              id="task"
              defaultValue={newTodo.task}
              onChange={(e) => setNewTodo({ ...newTodo, task: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {todo.photoFile && !photoFile ? (
              <>
                <Label htmlFor="photo" className="col-start-1 text-right">
                  Current Photo
                </Label>
                <img
                  alt="not found"
                  className="mx-auto max-w-[250px] max-h-[250px] "
                  src={URL.createObjectURL(todo.photoFile)}
                />
              </>
            ) : (
              photoFile && (
                <>
                  <Label htmlFor="photo" className="col-start-1 text-right">
                    Preview Photo
                  </Label>
                  <img
                    alt="not found"
                    className="mx-auto max-w-[250px] max-h-[250px] "
                    src={URL.createObjectURL(photoFile)}
                  />
                </>
              )
            )}
            <Label htmlFor="photo" className="col-start-1 text-right">
              Photo Upload
            </Label>
            <Input
              accept="image/*"
              capture="environment"
              type="file"
              id="photoFile"
              onChange={(e) => {
                setPhotoFile(
                  e.target.files && 0 < e.target.files.length
                    ? e.target.files[0]
                    : null,
                );
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter className="flex flex-col gap-4 sm:justify-between">
          <Button variant="destructive" onClick={() => removeTodo(todo.id)}>
            Delete todo
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default EditTodoDialog;

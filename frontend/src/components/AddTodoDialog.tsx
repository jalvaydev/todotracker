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

interface AddTodoDialogProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function AddTodoDialog({ setOpen }: AddTodoDialogProps) {
  const { addTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    task: "",
    completed: false,
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault;
    addTodo(newTodo);
    setNewTodo({
      id: 0,
      task: "",
      completed: false,
    });

    setOpen(false);
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
          <DialogTitle>Add todo</DialogTitle>
          <DialogDescription>
            Add your next todo here. Click save when you're done.
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
            {newTodo.photoFile && (
              <>
                <Label htmlFor="photo" className="col-start-1 text-right">
                  Preview Photo
                </Label>
                <img
                  alt="not found"
                  className="mx-auto max-w-[250px] max-h-[250px]"
                  src={URL.createObjectURL(newTodo.photoFile)}
                />
              </>
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
                setNewTodo({
                  ...newTodo,
                  photoFile:
                    e.target.files && 0 < e.target.files.length
                      ? e.target.files[0]
                      : undefined,
                });
              }}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}

export default AddTodoDialog;

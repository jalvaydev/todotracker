import { useState } from "react";
import AddTodoDialog from "./AddTodoDialog";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger } from "./ui/dialog";

function AddTodoButton() {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Add Todo</Button>
      </DialogTrigger>
      <AddTodoDialog setOpen={setOpen} />
    </Dialog>
  );
}

export default AddTodoButton;

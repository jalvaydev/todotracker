import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "./App.css";
import AddTodoButton from "./components/AddTodoButton";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="min-h-full flex flex-col">
      <Navbar />
      <div className="mx-auto grow my-auto h-full w-full py-10 max-w-2xl px-4 sm:px-6 lg:px-8">
        <SignedOut>
          <div className="text-2xl font-bold text-center my-auto">
            Sign in or sign up to access the Todotracker.
          </div>
        </SignedOut>
        <SignedIn>
          <TodoProvider>
            <div className="flex flex-col gap-8">
              <div className="mx-auto w-full sm:w-fit">
                <AddTodoButton />
              </div>
              <div>
                <TodoList />
              </div>
            </div>
          </TodoProvider>
        </SignedIn>
      </div>
    </div>
  );
}

export default App;

import { SignedIn, SignedOut } from "@clerk/clerk-react";
import "./App.css";
import AddTodoButton from "./components/AddTodoButton";
import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./context/TodoContext";

function App() {
  return (
    <div className="flex flex-col min-h-full">
      <Navbar />
      <div className="w-full h-full max-w-2xl px-4 py-10 mx-auto my-auto grow sm:px-6 lg:px-8">
        <SignedOut>
          <div className="my-auto text-2xl font-bold text-center">
            Sign in or sign up to access the Todotracker.
          </div>
        </SignedOut>
        <SignedIn>
          <TodoProvider>
            <div className="flex flex-col gap-8">
              <div className="w-full mx-auto sm:w-fit">
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

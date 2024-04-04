import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import SignUpButton from "./SignUpButton";
import { Button } from "./ui/button";

function Navbar() {
  return (
    <div className="container flex flex-col sm:flex-row h-14 max-w-screen-2xl items-center">
      <a
        href="/"
        className="text-3xl font-bold leading-tight tracking-tight text-primary"
      >
        Todotracker
      </a>
      <div className="flex gap-2 mx-auto sm:mr-0">
        <SignedOut>
          <SignInButton mode={"modal"}>
            <Button>Sign In</Button>
          </SignInButton>
          <SignUpButton>
            <Button>Sign up</Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default Navbar;

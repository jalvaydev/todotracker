import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { useSignUp } from "@clerk/clerk-react";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";

interface SignUpButtonProps {
  children: React.ReactNode;
}

interface SignUpErrorType {
  message: string;
  paramName: string;
}

function SignUpButton({ children }: SignUpButtonProps) {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [open, setOpen] = useState(false);
  const [error, setError] = useState<SignUpErrorType | null>(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true);
    } catch (err: any) {
      if (err.errors[0].message && err.errors[0].meta.paramName) {
        setError({
          message: err.errors[0].message,
          paramName: err.errors[0].meta.paramName,
        });
      }
    }
  }

  async function onPressVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        setOpen(false);
        console.log("completed signup");
      }
    } catch (err: any) {
      if (err.errors[0].message && err.errors[0].meta.paramName) {
        setError({
          message: err.errors[0].message,
          paramName: err.errors[0].meta.paramName,
        });
      }
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setCode("");
        setPassword("");
        setEmailAddress("");
        setPendingVerification(false);
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>

      {!pendingVerification && (
        <DialogContent className="sm:max-w-xl">
          <form onSubmit={handleSubmit}>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                Sign up
              </DialogTitle>
              <DialogDescription className="text-center">
                Sign up for your Todotracker account.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="email-address" className="text-right">
                  Email
                </Label>
                <Input
                  id="Email"
                  type="email"
                  value={emailAddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className="col-span-3"
                />
                {error && error.paramName === "email_address" && (
                  <div className="col-span-3 col-start-2 -mt-2 text-red-500">
                    {error.message}
                  </div>
                )}
              </div>
              <div className="grid items-center grid-cols-4 gap-4">
                <Label htmlFor="password" className="col-start-1 text-right">
                  Password
                </Label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="col-span-3"
                />
                {error && error.paramName === "password" && (
                  <div className="col-span-3 col-start-2 -mt-2 text-red-500">
                    {error.message}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Sign up</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}

      {pendingVerification && (
        <DialogContent className="sm:max-w-xl">
          <form onSubmit={onPressVerify}>
            <DialogHeader>
              <DialogTitle className="text-2xl text-center">
                Verify Email Address
              </DialogTitle>
              <DialogDescription className="text-center">
                Check your email address for a verification code.
              </DialogDescription>
            </DialogHeader>
            <div className="flex justify-center gap-4 py-4">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={(value) => setCode(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            {error && error.paramName === "code" && (
              <div className="col-span-3 -mt-2 text-center text-red-500">
                {error.message === "is incorrect"
                  ? "Incorrect code"
                  : error.message}
              </div>
            )}
            <DialogFooter>
              <Button type="submit">Verify Email</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default SignUpButton;

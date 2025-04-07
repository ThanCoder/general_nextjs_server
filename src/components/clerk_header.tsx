import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

function ClerkHeder() {
  return (
    <header className="flex justify-between items-center p-4 gap-4 h-16 bg-gray-600 rounded-bl-sm rounded-br-sm mb-2">
      <div className="left">
        <Link href="/" className="btn">Home</Link>
      </div>
      <div className="right flex justify-end gap-2">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
      </div>
     
    </header>
  );
}

export default ClerkHeder;

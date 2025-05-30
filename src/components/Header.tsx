import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export function Header() {
  return (
    <header className="p-4 border-b">
      <div className="container mx-auto flex justify-between items-center min-w-[48rem]">
        <SignedOut>
          <div className="space-x-4">
            <SignInButton
              appearance={{
                elements: {
                  rootBox: "w-25 py-4 text-center rounded-full bg-neutral-900 cursor-pointer hover:bg-neutral-800 duration-200"
                }
              }}
              mode="modal"
            />
            <SignUpButton
              appearance={{
                elements: {
                  rootBox: "w-25 py-4 text-center rounded-full bg-white cursor-pointer hover:bg-white/80 duration-200"
                }
              }}
              mode="modal"
            />
          </div>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </header>
  );
} 
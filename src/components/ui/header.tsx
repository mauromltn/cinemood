'use client';
import { navLinks } from '@/data/navLinks';
import { SearchBar } from './search-bar';
import { LogIn } from 'lucide-react';
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Header() {
   return (
      <header className="w-full h-fit text-sm py-8 px-2 z-10 text-white">
         <nav className="relative w-full px-4 flex items-center justify-between">
            <SignedOut>
               <a className="font-semibold text-xl md:w-[288px]" href="#" aria-label="Brand">CineMood</a>
            </SignedOut>
            <SignedIn>
               <a className="font-semibold text-xl" href="#" aria-label="Brand">CineMood</a>
            </SignedIn>

            {/* Menu for large screens */}
            <div className="hidden md:flex md:flex-row md:gap-8 py-4 px-6 bg-neutral-900 rounded-full">
               {navLinks.map((link, i) => (
                  <a
                     key={i}
                     href={link.path}
                     className="text-base text-neutral-500 active:text-white font-bold"
                  >
                     {link.name}
                  </a>
               ))}
            </div>

            <div className="flex items-center gap-4">
               <SearchBar />

               <SignedOut>
                  <SignInButton mode="modal">
                     <button className='sm:hidden rounded-full bg-white cursor-pointer'>
                        <LogIn color="#000000" size={40} className="p-3" />
                     </button>
                  </SignInButton>

                  <SignInButton mode="modal">
                     <button className="hidden sm:block w-25 py-4 font-bold text-center rounded-full bg-neutral-900 cursor-pointer hover:bg-neutral-800 duration-200">
                        Accedi
                     </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                     <button className="hidden sm:block w-25 py-4 text-black font-bold text-center rounded-full bg-white cursor-pointer hover:bg-white/80 duration-200">
                        Registrati
                     </button>
                  </SignUpButton>
               </SignedOut>
               <SignedIn>
                  <UserButton afterSignOutUrl="/" />
               </SignedIn>
            </div>
         </nav>
      </header>
   );
}

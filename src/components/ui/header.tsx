'use client';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { navLinks } from '@/data/navLinks';
import { SearchBar } from './search-bar';

const variants = {
   open: {
      opacity: 1,
      transform: "translateX(0)",
   },
   closed: {
      opacity: 0,
      transform: "translateX(10%)",
   },
};

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false);

   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
   };

   return (
      <header className="w-full h-fit text-sm py-8 px-2 z-10 text-white">
         <nav className="relative w-full px-4 flex items-center justify-between">
            <a className="font-semibold text-xl md:w-[288px]" href="#" aria-label="Brand">CineMood</a>

            <div className="flex items-center gap-6 md:hidden">
               <SearchBar />

               <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                 <Menu
                   size={40}
                   className="bg-neutral-900 rounded-full p-3 active:scale-90 duration-200 ease"
                 />
               </button>

               <motion.div
                 className={`${isMenuOpen ? "block" : "hidden"} absolute top-12 right-5 flex flex-col items-end gap-3`}
                 animate={isMenuOpen ? "open" : "closed"}
                 variants={variants}
               >
                 {navLinks.map((link, i) => (
                   <a
                     key={i}
                     href={link.path}
                     onClick={toggleMenu}
                     className="font-medium text-neutral-500 active:text-white"
                   >
                     {link.name}
                   </a>
                 ))}
               </motion.div>
            </div>

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

            <div className="hidden md:flex md:items-center md:gap-4">
               <SearchBar />

               <div className='w-25 py-4 text-center rounded-full bg-neutral-900 cursor-pointer hover:bg-neutral-800 duration-200'>
                 <a href="#" className='font-bold'>Login</a>
               </div>

               <div className='w-25 py-4 text-center rounded-full bg-white cursor-pointer hover:bg-white/80 duration-200'>
                 <a href="#" className='text-black font-bold'>Sign Up</a>
               </div>
            </div>
         </nav>
      </header>
   );
}

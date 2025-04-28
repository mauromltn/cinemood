'use client';
import { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { navLinks } from '@/data/navLinks';

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
      <header className="w-full h-fit text-sm px-5 py-8 z-10 text-white">
         <nav className="relative w-full px-4 flex items-center justify-between">
            <a className="font-semibold text-xl md:w-[288px]" href="#" aria-label="Brand">CineMood</a>

            <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
               <Menu
                  size={32}
                  className="bg-white text-black rounded-full p-2 active:scale-90 duration-200 ease"
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
                     className="font-medium active:text-white"
                  >
                     {link.name}
                  </a>
               ))}
            </motion.div>

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
               <div className='p-4 rounded-full bg-neutral-900 cursor-pointer hover:bg-neutral-800 duration-200'>
                 <Search />
               </div>

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
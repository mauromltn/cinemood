"use client"

import { useRouter } from "next/navigation"
import { Search } from "lucide-react"

export function SearchBar() {
   const router = useRouter()

   const handleSearchClick = () => {
      router.push("/search")
   }

   return (
      <>
         <div
            onClick={handleSearchClick}
            className='sm:hidden rounded-full bg-neutral-900 cursor-pointer'
         >
            <Search
               size={40}
               className="p-3"
            />
         </div>

         {/* Search for large screens */}
         <div
            onClick={handleSearchClick}
            className='hidden sm:block p-3 rounded-full bg-neutral-900 cursor-pointer hover:bg-neutral-800 duration-200'
         >
            <Search />
         </div>
      </>
   )
}

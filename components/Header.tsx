import { BeakerIcon, BellIcon } from "@heroicons/react/24/solid";
import { ShareIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
// import { SearchIcon } from "@heroicons/react/solid"
const Header = () => {
  const { logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    //clean-Up function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      {/* left side */}
      <div className="flex items-center space-x-2 md:space-x-10">
        {/* This image i am copied in github page */}
        {/* Netflix logo */}
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink">Home</li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>

      {/* right side */}
      <div className="flex items-center space-x-4 text-sm font-light">
        <ShareIcon className="hidden sm:inline h-6 w-6" />
        <p className="hidden lg:inline">Kits</p>
        <BellIcon className=" h-6 w-6" />
        {/* <Link href="/account"> */}
        <img
          onClick={logout}
          src="https://rb.gy/g1pwyx"
          alt="logout"
          className="cursor-pointer rounded"
        />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Header;

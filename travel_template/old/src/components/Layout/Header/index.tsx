'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { headerData } from "../Header/Navigation/menuData";
import Logo from "./Logo";
import HeaderLink from "../Header/Navigation/HeaderLink"; // Import HeaderLink component
import MobileHeaderLink from "../Header/Navigation/MobileHeaderLink"; // Import MobileHeaderLink component
import { useTheme } from "next-themes";

const Header: React.FC = () => {
  const pathUrl = usePathname(); // Get the current path URL
  const { theme, setTheme } = useTheme();
  // State for navbar toggle (mobile view)
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen); // Toggle navbar visibility
  };

  // State for sticky navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    // Set sticky state based on scroll position
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar); // Add scroll event listener
    return () => window.removeEventListener("scroll", handleStickyNavbar); // Clean up listener
  }, []);

  return (
    <header
      className={`fixed h-[94px] top-0 py-1 z-50 w-full bg-transperent transition-all ${
        sticky ? "shadow-lg bg-white" : "shadow-none"
      }`}
    >
      <div className="container mx-auto max-w-[1200px] flex items-center justify-between px-[15px] py-[24px]">
        {/* Logo */}
        <Logo />

        {/* Navigation links */}
        <nav className="hidden lg:flex flex-grow items-center justify-start space-x-6 ml-32">
          {headerData.map((item, index) => (
            <HeaderLink key={index} item={item} />
          ))}
        </nav>

        {/* Theme and Authentication buttons */}
        <div className="flex items-center space-x-4">
        <button
                  aria-label="theme toggler"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="flex h-8 w-8 items-center justify-center text-body-color duration-300 dark:text-white"
                >
                  <span>
                    <svg
                      viewBox="0 0 16 16"
                      className="hidden h-[22px] w-[22px]  dark:block"
                    >
                      <path d="M4.50663 3.2267L3.30663 2.03337L2.36663 2.97337L3.55996 4.1667L4.50663 3.2267ZM2.66663 7.00003H0.666626V8.33337H2.66663V7.00003ZM8.66663 0.366699H7.33329V2.33337H8.66663V0.366699V0.366699ZM13.6333 2.97337L12.6933 2.03337L11.5 3.2267L12.44 4.1667L13.6333 2.97337ZM11.4933 12.1067L12.6866 13.3067L13.6266 12.3667L12.4266 11.1734L11.4933 12.1067ZM13.3333 7.00003V8.33337H15.3333V7.00003H13.3333ZM7.99996 3.6667C5.79329 3.6667 3.99996 5.46003 3.99996 7.6667C3.99996 9.87337 5.79329 11.6667 7.99996 11.6667C10.2066 11.6667 12 9.87337 12 7.6667C12 5.46003 10.2066 3.6667 7.99996 3.6667ZM7.33329 14.9667H8.66663V13H7.33329V14.9667ZM2.36663 12.36L3.30663 13.3L4.49996 12.1L3.55996 11.16L2.36663 12.36Z" />
                    </svg>

                    <svg
                      viewBox="0 0 23 23"
                      className={`h-[30px] w-[30px]  text-dark dark:hidden ${
                        !sticky && pathUrl === "/" && "text-white"
                      }`}
                    >
                      <g clipPath="url(#clip0_40_125)">
                        <path d="M16.6111 15.855C17.591 15.1394 18.3151 14.1979 18.7723 13.1623C16.4824 13.4065 14.1342 12.4631 12.6795 10.4711C11.2248 8.47905 11.0409 5.95516 11.9705 3.84818C10.8449 3.9685 9.72768 4.37162 8.74781 5.08719C5.7759 7.25747 5.12529 11.4308 7.29558 14.4028C9.46586 17.3747 13.6392 18.0253 16.6111 15.855Z" />
                      </g>
                    </svg>
                  </span>
                </button>
          <Link href="/signin" className="hidden lg:block bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            Sign In
          </Link>
          <Link href="/signup" className="hidden lg:block bg-gray-100 text-black px-4 py-2 rounded-lg hover:bg-gray-200">
            Sign Up
          </Link>
        </div>

        {/* Mobile menu toggle button */}
        <button
          onClick={navbarToggleHandler}
          className="block lg:hidden p-2 rounded-lg"
        >
          <span className="block w-6 h-0.5 bg-black"></span>
          <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
          <span className="block w-6 h-0.5 bg-black mt-1.5"></span>
        </button>
      </div>

      {/* Mobile navigation menu */}
      <div
        className={`${navbarOpen ? "translate-x-0" : "translate-x-full"
          } lg:hidden fixed top-0 right-0 h-full w-3/4 bg-white shadow-lg transform transition-transform duration-300 max-w-[280px]`}
      >
        <div className="flex items-center justify-between p-4 ">
          <h2 className="text-lg font-bold">Menu</h2>
          <button onClick={navbarToggleHandler}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex flex-col items-start p-4">
          {headerData.map((item, index) => (
            <MobileHeaderLink key={index} item={item} />
          ))}
          <div className="mt-4 flex flex-col space-y-4 w-full">
            <button className="block w-full bg-blue-600 text-white py-2 rounded-lg">Theme Button</button>
            <Link href="/signin" className="block w-full bg-gray-100 text-black py-2 text-center rounded-lg">Sign In</Link>
            <Link href="/signup" className="block w-full bg-gray-100 text-black py-2 text-center rounded-lg">Sign Up</Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

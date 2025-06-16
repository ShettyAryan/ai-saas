import Link from "next/link";
import React from "react";
import { FileText } from "lucide-react";

const Header = () => {
  const isLoggedIn: boolean = false;
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Link href="/" className="flex items-center gap-1 lg:gap-2 shrink-0 ">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform-transition duration-200 ease-in-out" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            Summuro
          </span>
        </Link>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center ">
        <Link href="/#pricing">Pricing</Link>
        <Link href="/dashboard">Your Summaries</Link>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        {isLoggedIn ? (
          <div className="flex gap-2 items-center ">
            <Link href="/upload">Upload a PDF</Link>
          </div>
        ) : (
          <div>
            <Link href="/sign-in">Sign In</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;

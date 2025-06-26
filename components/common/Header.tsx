import React from "react";
import { FileText } from "lucide-react";
import { Button } from "../ui/button";
import Navlink from "./Navlink";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import PlanBadge from "./PlanBadge";

const Header = () => {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      <div className="flex lg:flex-1">
        <Navlink
          href="/"
          className="flex items-center gap-1 lg:gap-2 shrink-0 "
        >
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform-transition duration-200 ease-in-out" />
          <span className="font-extrabold text-gray-900 lg:text-xl">
            Summuro
          </span>
        </Navlink>
      </div>
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center ">
        <Navlink href="/#pricing">Pricing</Navlink>

        <SignedIn>
          <Navlink href="/dashboard">Your Summaries</Navlink>
        </SignedIn>
      </div>
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center ">
            <Navlink href="/upload">Upload a PDF</Navlink>
            <PlanBadge />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </SignedIn>
        <SignedOut>
          <Navlink href="/sign-in">Sign In</Navlink>
        </SignedOut>
      </div>
    </nav>
  );
};

export default Header;

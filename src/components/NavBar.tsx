'use client'
import React from "react";
import NavBarSubscribeComponent from "./NavBarSubscribe";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

type NavBarProp = {
  name: string;
  url: string;
};

const NavBarProps: NavBarProp[] = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Settings",
    url: "/settings",
  },
  {
    name: 'Admin',
    url: '/admin'
  },
  {
    name: 'Server',
    url: '/server'
  }
];

const NavBarComponent = () => {
  const pathname = usePathname()
  return (
    <div className="bg-secondary p-4 rounded-xl w-[800px] shadow-sm flex justify-between gap-10 items-center">
      <div className="">
        {NavBarProps.map((prop, index) => {
          return (
            <Button key={index} variant={pathname.toLowerCase() === prop.url.toLowerCase() ? 'default': 'outline'} asChild>
              <Link href={prop.url}>{prop.name}</Link>
            </Button>
          );
        })}
      </div>
      <NavBarSubscribeComponent />
    </div>
  );
};

export default NavBarComponent;

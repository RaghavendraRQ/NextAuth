import React from "react";
import NavBarSubscribeComponent from "./NavBarSubscribe";
import Link from "next/link";

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
    name: "Portfolio",
    url: "/portfolio",
  },
];

const NavBarComponent = () => {
  return (
    <div className="flex mt-10 justify-center gap-10 items-center">
      <span className="flex items-center justify-around gap-5 bg-[#C8DBD7] w-[700px] h-[55px] rounded-md">
        {NavBarProps.map((prop, index) => {
          return (
            <Link href={prop.url} key={index}>
              {prop.name}
            </Link>
          );
        })}
      </span>
      <NavBarSubscribeComponent />
    </div>
  );
};

export default NavBarComponent;

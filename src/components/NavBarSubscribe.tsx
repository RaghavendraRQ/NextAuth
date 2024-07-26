import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import LoginButtonComponent from "./auth/LoginButton";

const NavBarSubsrcibeComponent = () => {
  return (
    <span className="">
      <LoginButtonComponent>
        <Button>Login </Button>
      </LoginButtonComponent>
      <Link href={"/signup"}> Sign Up</Link>
    </span>
  );
};

export default NavBarSubsrcibeComponent;

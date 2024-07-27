"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import LoginButtonComponent from "./auth/LoginButton";
import { useCurrentUser } from "@/hooks/useCurrentUser";

import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import LogoutButtonComponent from "./auth/LogoutButton";

const NavBarSubsrcibeComponent = () => {
  const user = useCurrentUser();
  if (!user)
    return (
      <span className="">
        <LoginButtonComponent>
          <Button>Login </Button>
        </LoginButtonComponent>
        <Link href={"/signup"}> Sign Up</Link>
      </span>
    );
  return !user ? (
    <>
      <span className="">
        <LoginButtonComponent>
          <Button>Login </Button>
        </LoginButtonComponent>
        <Link href={"/signup"}> Sign Up</Link>
      </span>
    </>
  ) : (
    <>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user.image || ""} />
              <AvatarFallback className="bg-slate-400 text-white">
                FA
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40 " align="end">
            <LogoutButtonComponent>
              <DropdownMenuItem className="text-destructive">
                <ExitIcon className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </LogoutButtonComponent>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default NavBarSubsrcibeComponent;

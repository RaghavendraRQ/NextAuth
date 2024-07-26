"use client";
import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import HeaderComponent from "./Header";
import SocialComponent from "./Social";
import BackButtonComponent from "./BackButton";

interface CardWrapperComponentProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocail?: boolean;
}

const CardWrapperComponent = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocail,
}: CardWrapperComponentProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <HeaderComponent label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocail && (
        <CardFooter>
            <SocialComponent/>
        </CardFooter>
      )}
      <CardFooter>
        <BackButtonComponent backButtonLabel={backButtonLabel} backButtonHref={backButtonHref}/>
      </CardFooter>
    </Card>
  );
};

export default CardWrapperComponent;

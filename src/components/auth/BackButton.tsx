import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface BackButtonComponentProps {
  backButtonLabel: string;
  backButtonHref: string;
}

const BackButtonComponent = ({
  backButtonLabel,
  backButtonHref,
}: BackButtonComponentProps) => {
  return (
    <Button variant="link" className="font-normal w-full" size="sm" asChild>
      <Link href={backButtonHref}>{backButtonLabel}</Link>
    </Button>
  );
};
export default BackButtonComponent;

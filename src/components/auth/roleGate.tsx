"use client";
import { UserRole } from "@prisma/client";
import { useSession } from "next-auth/react";
import FormErrorComponent from "../FormError";

interface RoleGateComponentProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

const RoleGateComponent = ({
  children,
  allowedRoles,
}: RoleGateComponentProps) => {
  const session = useSession();
  const role = session.data?.user.role;
  if (role != allowedRoles) {
    return (
      <FormErrorComponent message="You are not authorized to view this Content" />
    );
  }
  return <>{children}</>;
};

export default RoleGateComponent;

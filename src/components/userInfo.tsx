import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface UserInfoComponentProps {
  user?: ExtendedUser;
  label: string;
}
import { Badge } from "@/components/ui/badge";

const UserInfoComponent = ({ user, label }: UserInfoComponentProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl text-center font-semibold">{label}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <ContentComponent placeholder="ID" value={user?.id} />
        <ContentComponent placeholder="Name" value={user?.name} />
        <ContentComponent placeholder="Email" value={user?.email} />
        <ContentComponent placeholder="Role" value={user?.role} />
        <ContentComponent
          placeholder="TwoFactorEnabled"
          value={user?.isTwoFactorEnabled ? "ON" : "OFF"}
        />
      </CardContent>
    </Card>
  );
};

const ContentComponent = ({
  placeholder,
  value,
}: {
  placeholder: string;
  value: string | undefined | null;
}) => {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
      <p className="text-sm font-medium">{placeholder}</p>
      <Badge
        variant={
          placeholder !== "TwoFactorEnabled"
            ? "secondary"
            : value === "ON"
            ? "success"
            : "destructive"
        }
      >
        {value}
      </Badge>
    </div>
  );
};

export default UserInfoComponent;

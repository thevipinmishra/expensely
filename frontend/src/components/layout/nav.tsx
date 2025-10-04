import { useMeta } from "@/modules/auth/services";
import { Link } from "@tanstack/react-router";
import { useLogout } from "@/utils/auth";
import { LogOut, Plus } from "lucide-react";
import { Avatar, Button, Menu, Skeleton, UnstyledButton } from "@mantine/core";

export default function Nav() {
  const metaQuery = useMeta();
  const logout = useLogout();
  return (
    <nav className="sticky top-0 z-20 shadow-xs py-3 bg-white/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-6">
        <Link to="/" className="text-lg font-semibold text-teal-800">
          Expensively
        </Link>

        <div className="flex gap-3 items-center">
          <Button
            component={Link}
            to="/add"
            variant="outline"
            size="sm"
            leftSection={<Plus size={20} />}
          >
            Add
          </Button>

          {metaQuery.isLoading ? (
            <Skeleton className="size-9" />
          ) : (
            <Menu>
              <Menu.Target>
                <Avatar color="teal" component={UnstyledButton}>{metaQuery.data?.data.firstName.charAt(0)}</Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                    {metaQuery.data?.data.firstName} {metaQuery.data?.data.lastName}
                </Menu.Label>
                <Menu.Divider />
                <Menu.Item color="teal" onClick={logout} leftSection={<LogOut className="size-4" />}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}

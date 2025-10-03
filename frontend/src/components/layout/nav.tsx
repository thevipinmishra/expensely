import { useMeta } from "@/modules/auth/services";
import { Link } from "@tanstack/react-router";
import { useLogout } from "@/utils/auth";
import { Plus } from "lucide-react";
import { Avatar, Button, Menu, Skeleton } from "@mantine/core";

export default function Nav() {
  const metaQuery = useMeta();
  const logout = useLogout();
  return (
    <nav className="sticky top-0 z-20 shadow-xs py-3 bg-white/80 backdrop-blur-sm">
      <div className="container flex items-center justify-between gap-6">
        <Link to="/" className="text-sm font-semibold">
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
                <Avatar> {metaQuery.data?.data.firstName.charAt(0)}</Avatar>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item onClick={logout}>Logout</Menu.Item>
              </Menu.Dropdown>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}

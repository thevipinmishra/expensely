import { useMeta } from "@/modules/auth/services";
import { Link } from "@tanstack/react-router";
import { Skeleton } from "../ui/skeleton";
import { Menu, MenuContent, MenuItem, MenuTrigger } from "../ui/menu";
import { useLogout } from "@/utils/auth";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";

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
          <Button asChild>
            <Link to="/add">
              <Plus className="size-4" /> Add
            </Link>
          </Button>

          {metaQuery.isLoading ? (
            <Skeleton className="size-9" />
          ) : (
            <Menu>
              <MenuTrigger className="size-9 rounded-full outline-teal-200 bg-white/80 backdrop-blur-sm border border-teal-200 text-sm text-teal-900 font-semibold">
                {metaQuery.data?.data.firstName.charAt(0)}
              </MenuTrigger>
              <MenuContent>
                <MenuItem value="logout" onClick={logout}>
                  Logout
                </MenuItem>
              </MenuContent>
            </Menu>
          )}
        </div>
      </div>
    </nav>
  );
}

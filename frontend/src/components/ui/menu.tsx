import { cn } from "@/lib/cn";
import {
  Menu as Primitive,
  type MenuContentProps,
  type MenuItemProps,
} from "@ark-ui/react/menu";

const Menu = Primitive.Root;
const MenuTrigger = Primitive.Trigger;

const MenuContent = ({ className, ...props }: MenuContentProps) => {
  return (
    <Primitive.Positioner>
      <Primitive.Content
        className={cn(
          "bg-white outline-0 rounded-md p-1 shadow-sm max-h-(--available-height) overflow-y-auto",
          "data-[state=open]:animate-in data-[state=open]:fade-in-5",
          className
        )}
        {...props}
      />
    </Primitive.Positioner>
  );
};

const MenuItem = ({ className, ...props }: MenuItemProps) => {
  return (
    <Primitive.Item
      className={cn(
        "inline-flex w-full text-sm font-medium text-gray-900 cursor-default rounded-sm bg-white data-[highlighted]:bg-teal-50 transition-colors gap-2 items-center [&_svg]:size-4 [&_svg]:shrink-0 px-2.5 py-1.25",
        className
      )}
      {...props}
    />
  );
};

export { Menu, MenuTrigger, MenuContent, MenuItem };

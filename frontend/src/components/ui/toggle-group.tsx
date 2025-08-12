import { cn } from "@/lib/cn";
import {
  ToggleGroup as Primitive,
  type ToggleGroupItemProps,
  type ToggleGroupRootProps,
} from "@ark-ui/react/toggle-group";

export const ToggleGroup = ({ className, ...props }: ToggleGroupRootProps) => {
  return (
    <Primitive.Root
      className={cn(
        "rounded-md p-1 gap-2 flex border border-slate-200",
        className
      )}
      {...props}
    />
  );
};

export const ToggleGroupItem = ({
  className,
  ...props
}: ToggleGroupItemProps) => {
  return (
    <Primitive.Item
      className={cn(
        "inline-flex justify-center items-center text-sm font-medium text-gray-700 px-3 py-1.5 h-9 flex-1 rounded-[inherit] aria-checked:bg-teal-900 transition-colors aria-checked:text-white",
        className
      )}
      {...props}
    />
  );
};

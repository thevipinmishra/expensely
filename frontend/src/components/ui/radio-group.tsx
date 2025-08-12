import { cn } from "@/lib/cn";
import {
  RadioGroup as Primitive,
  type RadioGroupItemProps,
  type RadioGroupLabelProps,
  type RadioGroupRootProps,
} from "@ark-ui/react/radio-group";

const RadioGroup = ({ className, ...props }: RadioGroupRootProps) => {
  return <Primitive.Root className={cn("grid gap-2", className)} {...props} />;
};

const RadioGroupLabel = ({ className, ...props }: RadioGroupLabelProps) => {
  return (
    <Primitive.Label
      className={cn("text-sm font-medium text-slate-700", className)}
      {...props}
    />
  );
};

const RadioGroupItem = ({ className, children, ...props }: RadioGroupItemProps) => {
  return (
    <Primitive.Item className={cn("flex items-center gap-2", className)} {...props}>
      <Primitive.ItemControl className="size-4 rounded-full shrink-0 border border-teal-900 bg-teal-50  data-[state=checked]:border-5 transition-all" />
      <Primitive.ItemText className="text-sm font-medium">{children}</Primitive.ItemText>
      <Primitive.ItemHiddenInput />
    </Primitive.Item>
  );
};

export { RadioGroup, RadioGroupLabel, RadioGroupItem };

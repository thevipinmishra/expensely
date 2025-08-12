import { cn } from "@/lib/cn";
import { Field as Primitive, type FieldRootProps } from "@ark-ui/react/field";

const Field = ({ className, ...props }: FieldRootProps) => {
  return <Primitive.Root className={cn("grid gap-2", className)} {...props} />;
};

export { Field };

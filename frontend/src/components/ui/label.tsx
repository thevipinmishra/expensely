import { cn } from "@/lib/cn";
import { Field, type FieldLabelProps } from "@ark-ui/react/field";

const Label = ({ className, ...props }: FieldLabelProps) => {
  return (
    <Field.Label
      className={cn(
        "text-sm font-medium text-slate-700",
        className
      )}
      {...props}
    />
  );
};

export { Label };

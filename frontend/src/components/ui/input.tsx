import { cn } from "@/lib/cn";
import { Field, type FieldInputProps, type FieldTextareaProps } from "@ark-ui/react/field";

const Input = ({ className, ...props }: FieldInputProps) => {
  return (
    <Field.Input
      className={cn(
        "inline-flex px-3 py-1 h-9.5 bg-white rounded-md border border-slate-300",
        "outline-0 focus:border-teal-800 transition-colors w-full",
        "aria-invalid:bg-red-50 aria-invalid:border-red-500 aria-invalid:text-red-700",
        className
      )}
      {...props}
    />
  );
};


const Textarea = ({ className, ...props }: FieldTextareaProps) => {
  return (
    <Field.Textarea
      className={cn(
        "inline-flex px-3 py-1 h-9.5 bg-white rounded-md border border-slate-300",
        "outline-0 focus:border-teal-800 transition-colors w-full",
        "aria-invalid:bg-red-50 aria-invalid:border-red-500 aria-invalid:text-red-700",
        className
      )}
      {...props}
    />
  );
};

export { Input, Textarea };

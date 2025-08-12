import { cn } from "@/lib/cn";
import { Field, type FieldErrorTextProps } from "@ark-ui/react/field";

export const FieldError = ({className, ...props}: FieldErrorTextProps) => {
    return <Field.ErrorText className={cn('text-sm text-red-500', className)} {...props} />
}
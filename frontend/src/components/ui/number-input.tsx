import { cn } from "@/lib/cn";
import {
  NumberInput as Primitive,
  type NumberInputRootProps,
} from "@ark-ui/react/number-input";

export const NumberInput = ({ className, ...props }: NumberInputRootProps) => {
  return (
    <Primitive.Root className="w-full" {...props}>
      <Primitive.Input
        className={cn(
          "inline-flex px-3 py-1 w-full h-9.5 bg-white rounded-md border border-slate-300",
          "outline-0 focus:border-teal-800 transition-colors", className
        )}
      />
    </Primitive.Root>
  );
};

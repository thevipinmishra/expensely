import { cn } from "@/lib/cn";
import {
  Checkbox as Primitive,
  type CheckboxRootProps,
} from "@ark-ui/react/checkbox";
import { CheckIcon } from "lucide-react";

const Checkbox = ({ className, children, ...props }: CheckboxRootProps) => {
  return (
    <Primitive.Root className={cn("flex gap-2 items-center", className)} {...props}>
      <Primitive.Label className="order-last text-sm font-medium text-gray-900">{children}</Primitive.Label>
      <Primitive.Control className="size-4 flex justify-center items-center rounded-sm border shrink-0 border-teal-950 bg-teal-50 data-[state=checked]:bg-teal-950 data-[state=checked]:text-white transition-colors">
        <Primitive.Indicator>
          <CheckIcon className="size-3" />
        </Primitive.Indicator>
      </Primitive.Control>
      <Primitive.HiddenInput />
    </Primitive.Root>
  );
};

export { Checkbox };

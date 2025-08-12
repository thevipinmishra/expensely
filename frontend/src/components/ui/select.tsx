import { cn } from "@/lib/cn";
import { Portal } from "@ark-ui/react/portal";
import {
  Select as Primitive,
  type SelectContentProps,
  type SelectRootProps,
  type SelectTriggerProps as PrimitiveTriggerProps,
  type SelectValueTextProps,
  type SelectItemProps,
  type SelectLabelProps,
} from "@ark-ui/react/select";
import { Check, ChevronsUpDown } from "lucide-react";

interface SelectTriggerProps extends PrimitiveTriggerProps {
  placeholder?: SelectValueTextProps["placeholder"];
}

interface SelectProps<T = string> extends SelectRootProps<T> {
  children: React.ReactNode;
}

const Select = <T = string,>({ children, ...props }: SelectProps<T>) => {
  return (
    <Primitive.Root {...props}>
      {children}
      <Primitive.HiddenSelect />
    </Primitive.Root>
  );
};

const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
  return (
    <Primitive.Label
      className={cn("text-sm font-medium text-slate-700", className)}
      {...props}
    />
  );
};

const SelectTrigger = ({
  className,
  placeholder = "Select",
  ...props
}: SelectTriggerProps) => {
  return (
    <Primitive.Control>
      <Primitive.Trigger
        className={cn(
          "rounded-md h-9.5 outline-0 items-center inline-flex px-3 py-1 border border-slate-200 w-full",
          className
        )}
        {...props}
      >
        <Primitive.Context>
          {({ valueAsString }) => (
            <Primitive.ValueText
              data-placeholder={!valueAsString}
              placeholder={placeholder}
              className="flex-1 text-sm data-[placeholder=true]:text-gray-500 text-gray-800 font-medium text-left inline-block text-ellipsis overflow-hidden"
            />
          )}
        </Primitive.Context>
        <Primitive.Indicator>
          <ChevronsUpDown className="size-4 text-gray-600" />
        </Primitive.Indicator>
      </Primitive.Trigger>
    </Primitive.Control>
  );
};

const SelectContent = ({ className, ...props }: SelectContentProps) => {
  return (
    <Portal>
      <Primitive.Positioner>
        <Primitive.Content
          className={cn(
            "bg-white outline-0 rounded-md p-1 shadow-sm w-(--reference-width) max-h-(--available-height) overflow-y-auto",
            "data-[state=open]:animate-in data-[state=open]:fade-in-5",
            className
          )}
          {...props}
        />
      </Primitive.Positioner>
    </Portal>
  );
};

const SelectItem = ({ children, className, ...props }: SelectItemProps) => {
  return (
    <Primitive.Item
      className={cn(
        "flex cursor-default gap-2 items-center px-2 py-2 rounded-md transition-colors data-[highlighted]:bg-gray-100",
        className
      )}
      {...props}
    >
      <Primitive.ItemText className="inline-block flex-1 overflow-hidden text-sm font-medium text-ellipsis">
        {children}
      </Primitive.ItemText>
      <Primitive.ItemIndicator>
        <Check className="size-4 text-gray-600" />
      </Primitive.ItemIndicator>
    </Primitive.Item>
  );
};

export { Select, SelectLabel, SelectTrigger, SelectContent, SelectItem };

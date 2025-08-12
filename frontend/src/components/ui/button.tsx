import { ark, type HTMLArkProps } from "@ark-ui/react";
import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: [
    "inline-flex items-center text-sm font-medium justify-center gap-1.5 [&_svg]:shrink-0  px-3 py-1 h-9.5 rounded-md",
    "outline-0 transition-colors select-none",
  ],
  variants: {
    variant: {
      solid: ["bg-teal-900 text-white", "hover:bg-teal-800"],
    },
  },
  defaultVariants: {
    variant: "solid",
  },
});

type ButtonProps = HTMLArkProps<"button"> & VariantProps<typeof buttonVariants>;

const Button = ({ className, variant, ...props }: ButtonProps) => {
  return (
    <ark.button
      className={buttonVariants({
        variant,
        className,
      })}
      {...props}
    />
  );
};

export { Button };

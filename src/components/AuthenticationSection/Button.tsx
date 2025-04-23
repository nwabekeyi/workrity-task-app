import { ReactNode, AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "text";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string });

const variants: Record<Variant, string> = {
  primary:
    "w-full rounded-md bg-blue-500 text-sm/6 text-white shadow-xs hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600",
  secondary:
    "w-full gap-3 rounded-md bg-white text-sm text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 focus-visible:ring-transparent",
  text: "text-purple-600 hover:text-purple-500 bg-transparent",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex justify-center items-center gap-2 font-semibold rounded-md py-2 px-3 text-sm outline-offset-2 transition active:transition-none";
  const finalClassName = `${baseStyles} ${variants[variant]} ${className}`;

  return typeof props.href === "undefined" ? (
    <button type="button" className={finalClassName} {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  ) : (
    <a className={finalClassName} {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}>
      {children}
    </a>
  );
}

"use client";

import { usePageTransition } from "@/components/page-transition";

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function TransitionLink({
  href,
  children,
  className,
  ...props
}: Props) {
  const { navigate } = usePageTransition();

  return (
    <a
      href={href}
      className={className}
      {...props}
      onClick={(e) => {
        e.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </a>
  );
}

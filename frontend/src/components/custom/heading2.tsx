import React from "react";
import classNames from "classnames";

export default function Heading2({
  children,
  className,
  ...props
}: { children: string; className?: string } & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={ classNames("text-3xl font-bold tracking-tight sm:text-4xl", className) }
      { ...props }
    >
      { children }
    </h2>
  );
}

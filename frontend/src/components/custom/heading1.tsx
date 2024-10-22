import React from "react";
import classNames from "classnames";

export default function Heading1({
  children,
  className,
  ...props
}: { children: string; className?: string } & React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      className={ classNames("text-balance text-4xl font-bold tracking-tight sm:text-6xl", className) }
      { ...props }
    >
      { children }
    </h1>
  );
}

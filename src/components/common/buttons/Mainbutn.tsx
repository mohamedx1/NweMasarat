import React from "react";

export default function Mainbutn({
  children,
  pading,
  bg,
  hvr,
  transiton,
  border,
  text,
  onClick,
}: {
  children: React.ReactNode;
  pading?: string;
  bg?: string;
  hvr?: string;
  transiton?: string;
  border?: string;
  text?: string;
  onClick?: () => void;
}) {
  console.log(pading);
  return (
    <button
      className={` rounded-lg ${pading} ${bg} ${hvr} ${text} ${border} transition   `}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

import { ReactNode } from "react";
export default function Backdrop({
  children,
  className = "",
  onClick = () => {}
}: {
  children?: ReactNode,
  className?: string,
  onClick?: () => void
}) {
  return (
    <div className={`fixed inset-0 bg-black/30 ${className}`} aria-hidden="true" onClick={onClick}>
      {children}
    </div>
  );
}

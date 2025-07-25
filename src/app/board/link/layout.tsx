import { ReactNode } from 'react';

export default function LinkLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <main>{children}</main>;
}

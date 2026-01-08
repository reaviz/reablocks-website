import type { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto p-4">
      {children}
    </div>
  );
}

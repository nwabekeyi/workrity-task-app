// components/ContainerLayout.tsx
import { ReactNode } from "react";
import { Gradient } from "./Gradient";

interface ContainerLayoutProps {
  children: ReactNode;
  reverse?: boolean;
}

export function ContainerLayout({ children, reverse = false }: ContainerLayoutProps) {
  const flexDirection = reverse ? "flex-row-reverse" : "flex-row";

  return (
    <div className={`flex flex-1 min-h-[100vh] ${flexDirection}`}>
      <section className="relative hidden w-0 flex-1 items-center bg-blue-500 from-purple-500 lg:flex">
        <Gradient />
      </section>
      <section className="custom-scrollbar flex flex-1 flex-col px-4 py-12 max-h-screen overflow-auto shadow sm:px-6 lg:flex-none lg:px-20 xl:px-24 justify-center">
        {children}
      </section>
    </div>
  );
}

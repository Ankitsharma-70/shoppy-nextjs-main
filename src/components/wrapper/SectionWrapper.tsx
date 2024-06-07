import type { ReactNode } from "react";

const SectionWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <section className="grid content-start rounded-3xl bg-white p-4  shadow-2xl shadow-brand-100/50">
      {children}
    </section>
  );
};
export default SectionWrapper;

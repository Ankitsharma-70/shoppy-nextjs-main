import type { ReactNode } from "react";

const TableData = ({
  children,
  label,
}: {
  children: ReactNode;

  label: string | number;
}) => {
  return (
    <td
      data-label={label}
      className={` block p-4 text-right before:float-left  before:text-sm before:capitalize before:content-[attr(data-label)] md:table-cell  md:text-start	 md:before:hidden `}
    >
      {children}
    </td>
  );
};

export default TableData;

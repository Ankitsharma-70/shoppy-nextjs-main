const TableHeading = ({
  children,
  centerText,
}: {
  children: React.ReactNode;
  centerText?: boolean;
}) => {
  return (
    <th
      className={` ${
        centerText ? " text-center" : "text-start "
      } hidden py-2 px-4 text-base  font-light capitalize text-gray-700 md:table-cell`}
    >
      {children}
    </th>
  );
};

export default TableHeading;

import React from "react";

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (value: any, row: T, rowIndex: number) => React.ReactNode;
  className?: string;
}

export interface DynamicTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string | number;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
}

export function DynamicTable<T>({
  columns,
  data,
  rowKey,
  tableClassName = "w-full table-auto border-collapse border-spacing-0 min-w-[1350px]",
  theadClassName = "sticky top-0 z-10 bg-[#2C2C30] text-xl",
  tbodyClassName = "",
}: DynamicTableProps<T>) {
  return (
    <table className={tableClassName}>
      <thead className={theadClassName}>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              className={
                col.className ||
                "text-[#ACB5BB] font-medium text-xl py-4 px-5 bg-[#2C2C30]"
              }
            >
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={tbodyClassName}>
        {data.map((row, rowIndex) => (
          <tr
            key={rowKey(row)}
            className="border-t border-[#23232A] text-white text-[1.2rem] hover:bg-[#23232A] transition"
          >
            {columns.map((col) => (
              <td
                key={col.key}
                className={col.className || "py-4 px-5 text-center"}
              >
                {col.render
                  ? col.render((row as any)[col.key], row, rowIndex)
                  : (row as any)[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

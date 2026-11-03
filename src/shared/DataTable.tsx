import type { ReactNode } from 'react';

export interface Column<T> {
  /** Text shown in the `<th>` */
  header: string;
  /** Render prop — receives the row and returns the cell content */
  cell: (row: T) => ReactNode;
  /** Optional: right-align the cell (e.g. action columns) */
  align?: 'left' | 'right';
}

interface DataTableProps<T> {
  /** Array of rows to display */
  rows: T[];
  /** Column definitions — header label + cell renderer */
  columns: Column<T>[];
  /** How to derive a unique React key from each row */
  getRowKey: (row: T) => string | number;
  /** Message shown when `rows` is empty */
  emptyMessage?: string;
}

/**
 * Generic data table — knows nothing about specific data types,
 * Redux, routing or the API. All domain logic lives in the caller.
 */
export default function DataTable<T>({
  rows,
  columns,
  getRowKey,
  emptyMessage = 'No data found.',
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return <p className="py-6 text-center text-gray-500">{emptyMessage}</p>;
  }

  return (
    <div className="overflow-x-auto rounded border bg-white">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className={`px-4 py-2 font-semibold text-gray-700 ${
                  col.align === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row) => (
            <tr key={getRowKey(row)}>
              {columns.map((col) => (
                <td
                  key={col.header}
                  className={`px-4 py-2 ${col.align === 'right' ? 'text-right' : ''}`}
                >
                  {col.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


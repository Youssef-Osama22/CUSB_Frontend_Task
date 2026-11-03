import type { EventItem } from '../../types';
import { DataTable } from '../../shared';
import type { Column } from '../../shared';

interface Props {
  events: EventItem[];
  onDelete: (id: number) => void;
}

export default function EventsTable({ events, onDelete }: Props) {
  const columns: Column<EventItem>[] = [
    { header: 'Title',      cell: (e) => e.title },
    { header: 'Category',   cell: (e) => e.category },
    { header: 'Date',       cell: (e) => <span className="text-gray-600">{e.date}</span> },
    { header: 'Registered', cell: (e) => `${e.registered} / ${e.capacity}` },
    {
      header: 'Actions',
      align: 'right',
      cell: (e) => (
        <button
          onClick={() => {
            if (window.confirm(`Delete "${e.title}"?`)) onDelete(e.id);
          }}
          className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
        >
          Delete
        </button>
      ),
    },
  ];

  return (
    <DataTable
      rows={events}
      columns={columns}
      getRowKey={(e) => e.id}
      emptyMessage="No events found."
    />
  );
}

import type { Application, ApplicationStatus } from '../../types';
import StatusBadge from '../StatusBadge';
import { DataTable } from '../../shared';
import type { Column } from '../../shared';

interface Props {
  applications: Application[];
  onChange: (id: number, status: ApplicationStatus) => void;
}

export default function ApplicationsTable({ applications, onChange }: Props) {
  const columns: Column<Application>[] = [
    { header: 'Applicant',  cell: (a) => a.applicantName },
    { header: 'Email',      cell: (a) => <span className="text-gray-600">{a.email}</span> },
    { header: 'Committee',  cell: (a) => a.committee },
    { header: 'Applied',    cell: (a) => <span className="text-gray-600">{a.appliedAt}</span> },
    { header: 'Status',     cell: (a) => <StatusBadge status={a.status} /> },
    {
      header: 'Actions',
      align: 'right',
      cell: (a) => (
        <>
          <button
            onClick={() => onChange(a.id, 'accepted')}
            className="mr-2 rounded bg-green-600 px-3 py-1 text-white hover:bg-green-700"
          >
            Accept
          </button>
          <button
            onClick={() => onChange(a.id, 'rejected')}
            className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
          >
            Reject
          </button>
        </>
      ),
    },
  ];

  return (
    <DataTable
      rows={applications}
      columns={columns}
      getRowKey={(a) => a.id}
      emptyMessage="No applications found."
    />
  );
}

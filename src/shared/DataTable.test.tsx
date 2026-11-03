import { render, screen } from '@testing-library/react';
import DataTable from './DataTable';
import type { Column } from './DataTable';

// ---------- test data ----------
interface Person {
  id: number;
  name: string;
  age: number;
}

const people: Person[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob',   age: 25 },
];

const columns: Column<Person>[] = [
  { header: 'Name', cell: (p) => p.name },
  { header: 'Age',  cell: (p) => p.age },
];

// ---------- tests ----------
describe('DataTable', () => {
  it('renders column headers', () => {
    render(
      <DataTable rows={people} columns={columns} getRowKey={(p) => p.id} />,
    );
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders one row per item', () => {
    render(
      <DataTable rows={people} columns={columns} getRowKey={(p) => p.id} />,
    );
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('shows the default empty message when rows is empty', () => {
    render(
      <DataTable rows={[]} columns={columns} getRowKey={(p) => p.id} />,
    );
    expect(screen.getByText('No data found.')).toBeInTheDocument();
  });

  it('shows a custom emptyMessage when provided', () => {
    render(
      <DataTable
        rows={[]}
        columns={columns}
        getRowKey={(p) => p.id}
        emptyMessage="Nothing here yet."
      />,
    );
    expect(screen.getByText('Nothing here yet.')).toBeInTheDocument();
  });

  it('does not render the table when rows is empty', () => {
    render(
      <DataTable rows={[]} columns={columns} getRowKey={(p) => p.id} />,
    );
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
  });

  it('calls the cell render prop with the correct row', () => {
    const cellFn = vi.fn((p: Person) => <span>{p.name}</span>);
    const cols: Column<Person>[] = [{ header: 'Name', cell: cellFn }];

    render(<DataTable rows={people} columns={cols} getRowKey={(p) => p.id} />);

    expect(cellFn).toHaveBeenCalledWith(people[0]);
    expect(cellFn).toHaveBeenCalledWith(people[1]);
  });

  it('renders JSX returned by a cell render prop', () => {
    const cols: Column<Person>[] = [
      {
        header: 'Tag',
        cell: (p) => <span data-testid={`tag-${p.id}`}>{p.name}</span>,
      },
    ];

    render(<DataTable rows={people} columns={cols} getRowKey={(p) => p.id} />);

    expect(screen.getByTestId('tag-1')).toHaveTextContent('Alice');
    expect(screen.getByTestId('tag-2')).toHaveTextContent('Bob');
  });
});


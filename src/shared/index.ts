// Public API of the "shared package".
// Anything exported here should be reusable by the Main site, the Admin portal
// and the HR portal. Add your exports below.
export { default as DataTable } from './DataTable';
export type { Column } from './DataTable';

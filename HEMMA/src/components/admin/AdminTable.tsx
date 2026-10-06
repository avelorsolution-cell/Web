import type { ReactNode } from 'react'

interface Column<T> {
  key: string
  label: string
  render: (row: T) => ReactNode
}

interface AdminTableProps<T> {
  columns: Column<T>[]
  rows: T[]
  onRowClick?: (row: T) => void
  emptyLabel?: string
}

export default function AdminTable<T>({ columns, rows, onRowClick, emptyLabel = 'No records found.' }: AdminTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-black/5 text-start">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-start text-xs font-semibold uppercase tracking-wide text-muted">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-sm text-muted">
                {emptyLabel}
              </td>
            </tr>
          ) : (
            rows.map((row, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(row)}
                className={['border-b border-border last:border-0', onRowClick ? 'cursor-pointer hover:bg-teal-light/40' : ''].join(' ')}
              >
                {columns.map((col) => (
                  <td key={col.key} className="px-4 py-3 text-navy">
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

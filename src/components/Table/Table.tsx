import React from "react"

type TableProps = {
  children?: React.ReactNode
  className?: string
  props?: React.HTMLProps<HTMLTableElement>
}

type TableHeadProps = Omit<TableProps, "props"> & {
  props?: React.HTMLProps<HTMLTableSectionElement>
}
type TableRowProps = Omit<TableProps, "props"> & {
  props?: React.HTMLProps<HTMLTableRowElement>
}
type TableHeaderProps = Omit<TableProps, "props"> & {
  props?: React.HTMLProps<HTMLTableCellElement>
}

export default function Table({ children, ...props }: TableProps) {
  return (
    <table {...props} className="w-full text-left">
      {children}
    </table>
  )
}

function TableHead({ children, ...props }: TableHeadProps) {
  return (
    <thead {...props} className="text-neutral-500">
      {children}
    </thead>
  )
}

function TableRow({ children, ...props }: TableRowProps) {
  return (
    <tr {...props} className="border-y-1 border-neutral-200 border-collapse">
      {children}
    </tr>
  )
}

function TableHeader({ children, ...props }: TableHeaderProps) {
  return (
    <th {...props} className="px-3 py-2 font-semibold">
      {children}
    </th>
  )
}

function TableDataCell({ children, ...props }: TableHeaderProps) {
  return (
    <td {...props} className="px-3 py-2">
      {children}
    </td>
  )
}

function TableBody({ children, ...props }: TableHeadProps) {
  return <tbody {...props}>{children}</tbody>
}

Table.TableDataCell = TableDataCell
Table.Header = TableHeader
Table.Row = TableRow
Table.Head = TableHead
Table.Body = TableBody

Table.thead = TableHead
Table.th = TableHeader
Table.tr = TableRow
Table.td = TableDataCell

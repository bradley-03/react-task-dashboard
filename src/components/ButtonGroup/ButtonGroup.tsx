type ButtonGroupProps = {
  children: React.ReactNode
}

export default function ButtonGroup({ children }: ButtonGroupProps) {
  return (
    <div className="flex flex-row [&>*]:rounded-none [&>*]:shadow-none rounded overflow-hidden shadow">{children}</div>
  )
}

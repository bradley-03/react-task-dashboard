export default function Label({ children, ...props }: React.ComponentProps<"label">) {
  const labelProps = `text-left text-md select-none ${props.className || ""}`

  return (
    <label {...props} className={labelProps}>
      {children}
    </label>
  )
}

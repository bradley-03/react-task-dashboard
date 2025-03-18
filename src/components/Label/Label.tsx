export default function Label({ children, ...props }: React.ComponentProps<"label">) {
  const labelProps = `text-left text-md select-none ${props.className || ""}`

  return (
    <label className={labelProps} {...props}>
      {children}
    </label>
  )
}

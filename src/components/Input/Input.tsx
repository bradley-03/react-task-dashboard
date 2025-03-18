export default function Input({ type, ...props }: React.ComponentProps<"input">) {
  const inputStyles = `dark:bg-black dark:text-white bg-white text-black dark:disabled:bg-neutral-700 disabled:bg-neutral-200 disabled:cursor-not-allowed flex h-9 placeholder:text-neutral-400 placeholder w-full min-w-0 rounded-md transition px-3 py-2 dark:outline-white focus:outline-1 outline-neutral-600 dark:border-neutral-600 border-neutral-300 border-1 shadow flex items-center file:border-neutral-600 file:font-semibold file:border-r-1 file:pe-2 file:ps-1 file:me-2 file:inline-flex ${
    props.className || ""
  }`

  return <input type={type} className={inputStyles} {...props} />
}

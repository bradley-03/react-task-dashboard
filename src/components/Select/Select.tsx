// export default function Select({ children, ...props }: React.ComponentProps<"select">) {
//   const selectStyles = `dark:bg-black dark:text-white bg-white text-black dark:disabled:bg-neutral-700 disabled:bg-neutral-200 disabled:cursor-not-allowed placeholder:text-neutral-400 w-full min-w-0 rounded-md transition px-3 py-2 dark:outline-white focus:outline-1 outline-neutral-600 dark:border-neutral-600 border-neutral-300 border-1 shadow ${
//     props.className || ""
//   }`

//   return (
//     <select {...props} className={selectStyles}>
//       {children}
//     </select>
//   )
// }

import { default as RSelect } from "react-select"
import { GroupBase, Props } from "react-select"

export default function Select<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return (
    <RSelect
      {...props}
      unstyled
      classNames={{
        container: state => `rounded-md transition shadow ${state.isFocused && "outline-1 outline-neutral-600"}`,
        control: () => `bg-white h-9 text-black text-left rounded-md border-1 border-neutral-300 px-3 py-2`,
        menu: () => `mt-2 rounded-md overflow-hidden border-1 border-neutral-300`,
        option: () =>
          `bg-white px-2 py-1 hover:cursor-pointer hover:bg-neutral-200 transition text-left border-neutral-300 border-1 border-collapse`,
      }}
    />
  )
}

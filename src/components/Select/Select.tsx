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
        container: state =>
          `rounded-md transition shadow ${state.isFocused && " outline-1 dark:outline-white outline-neutral-600"}`,
        control: state =>
          ` h-9 text-left rounded-md border-1 border-neutral-300 dark:border-neutral-600 px-3 py-2 ${
            state.isDisabled
              ? "dark:bg-neutral-700 bg-neutral-200 text-neutral-500 dark:text-neutral-300"
              : "bg-white dark:bg-black dark:text-white text-black"
          }`,
        menu: () =>
          `mt-2 dark:bg-black bg-white rounded-md overflow-hidden border-1 dark:border-neutral-600 border-neutral-300 shadow p-1`,
        option: () =>
          `bg-white dark:bg-black px-2 rounded-md py-1 dark:hover:bg-neutral-600 hover:bg-neutral-200 text-left`,
        valueContainer: state => (state.isDisabled ? "cursor-not-allowed" : "cursor-pointer"),
        dropdownIndicator: state => (state.isDisabled ? "cursor-not-allowed" : "cursor-pointer"),
      }}
    />
  )
}

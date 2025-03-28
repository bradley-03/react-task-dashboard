import { TextareaHTMLAttributes } from "react"

export default function TextArea({ ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textAreaStyles = `dark:bg-black dark:text-white bg-white text-black dark:disabled:bg-neutral-700 disabled:bg-neutral-200 disabled:cursor-not-allowed flex placeholder:text-neutral-400 placeholder w-full min-w-0 rounded-md transition px-3 py-2 dark:outline-white focus:outline-1 outline-neutral-600 dark:border-neutral-600 border-neutral-300 border-1 shadow ${
    props.className || ""
  }`
  return <textarea {...props} className={textAreaStyles} />
}

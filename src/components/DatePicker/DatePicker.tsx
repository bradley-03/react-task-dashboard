import { default as RDatePicker } from "react-datepicker"
import { FaRegCalendarAlt } from "react-icons/fa"
import { useState } from "react"

import "react-datepicker/dist/react-datepicker.css"
import styles from "./DatePicker.module.css"

export default function DatePicker({ ...props }) {
  const [startDate, setStartDate] = useState<Date | null>(null)

  return (
    <RDatePicker
      {...props}
      selected={startDate}
      icon={<FaRegCalendarAlt />}
      showIcon
      onChange={date => setStartDate(date)}
      className="dark:bg-black dark:text-white bg-white text-black dark:disabled:bg-neutral-700 disabled:bg-neutral-200 disabled:cursor-not-allowed h-9 placeholder:text-neutral-400 placeholder w-full min-w-0 rounded-md transition px-3 py-2 dark:outline-white focus:outline-1 outline-neutral-600 dark:border-neutral-600 border-neutral-300 border-1 shadow"
      isClearable
      clearButtonClassName={styles.customClear}
    />
  )
}

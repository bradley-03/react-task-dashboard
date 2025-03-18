export default function Divider({ className }: { className?: string }) {
  return <hr className={`my-4 w-full dark:border-neutral-600 border-neutral-300 border-top-1 ${className || ""}`} />
}

import { createPortal } from "react-dom"
import { RxCross2 } from "react-icons/rx"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onMouseDown={handleMouseDown}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onMouseDown={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button onClick={onClose} className="cursor-pointer text-black hover:text-gray-700 text-3xl">
            <RxCross2 />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modals") as HTMLElement
  )
}

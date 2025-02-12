import React from "react"

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}

export default function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  const handleBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={handleBackgroundClick}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-96" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          <button onClick={onClose} className="cursor-pointer text-gray-600 hover:text-gray-900">
            ✖
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

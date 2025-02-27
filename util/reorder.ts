export function moveBetween(
  from: unknown[],
  to: unknown[],
  indexFrom: number,
  indexTo: number
): { updatedFrom: unknown[]; updatedTo: unknown[] } {
  const fromCopy = [...from]
  const toCopy = [...to]

  const [removedItem] = fromCopy.splice(indexFrom, 1)
  toCopy.splice(indexTo, 0, removedItem)

  return {
    updatedFrom: fromCopy,
    updatedTo: toCopy,
  }
}

export function reorder(arr: unknown[], indexFrom: number, indexTo: number): unknown[] {
  const arrCopy = [...arr]
  const [removedItem] = arrCopy.splice(indexFrom, 1)
  arrCopy.splice(indexTo, 0, removedItem)

  return arrCopy
}

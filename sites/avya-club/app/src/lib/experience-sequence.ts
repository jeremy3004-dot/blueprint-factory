export function nextSequenceIndex(
  currentIndex: number,
  direction: number,
  itemCount: number
): number {
  return (currentIndex + direction + itemCount) % itemCount;
}

export function sequenceProgress(index: number, itemCount: number): string {
  return `${(((index + 1) / itemCount) * 100).toFixed(2)}%`;
}

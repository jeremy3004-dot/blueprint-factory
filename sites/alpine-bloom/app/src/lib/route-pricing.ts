export function formatStartingRate(value: number | null | undefined) {
  if (value == null) return "Custom quote";
  return `$${value.toLocaleString()}+`;
}

export function formatStartingRateWithPrefix(value: number | null | undefined) {
  if (value == null) return "Custom quote";
  return `From $${value.toLocaleString()}+`;
}

export function formatSnapshotRate(value: number | null | undefined) {
  if (value == null) return "Snapshot rate not listed";
  return `$${value.toLocaleString()} planning snapshot`;
}

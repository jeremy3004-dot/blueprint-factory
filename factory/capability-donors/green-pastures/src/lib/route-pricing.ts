export function formatStartingRate(value: number | null | undefined) {
  if (value == null) {
    return "Custom quote";
  }

  return `$${value.toLocaleString()}+`;
}

export function formatStartingRateWithPrefix(value: number | null | undefined) {
  if (value == null) {
    return "Custom quote";
  }

  return `From $${value.toLocaleString()}+`;
}

export function formatOperatorRate(value: number | null | undefined) {
  if (value == null) {
    return "Partner rate not listed";
  }

  return `$${value.toLocaleString()} partner-published rate`;
}

const getFormattedDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "numeric" });
}

export { getFormattedDate }
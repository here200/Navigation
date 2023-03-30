import dayjs from "dayjs";

export function formatTime(date, formatStr) {
  return dayjs(date).format(formatStr)
}
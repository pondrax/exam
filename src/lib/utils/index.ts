import dayjs from 'dayjs';
dayjs.prototype.date = function (format = 'YYYY-MM-DD') {
  return this.format(format);
};
dayjs.prototype.time = function (format = 'HH:mm:ss') {
  return this.format(format);
};
export const d = dayjs
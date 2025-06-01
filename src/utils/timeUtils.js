export const timeToMinutes = (t) => {
  const h = parseInt(t.slice(0,2));
  const m = parseInt(t.slice(2,4));
  const s = parseInt(t.slice(4,6));
  return h * 60 + m + (s >= 30 ? 1 : 0);
};

export const minutesToTime = (min) => {
  const h = String(Math.floor(min / 60)).padStart(2, '0');
  const m = String(min % 60).padStart(2, '0');
  return `${h}${m}00`;
};

export const getCurrentTimeInMinutes = () => {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
};

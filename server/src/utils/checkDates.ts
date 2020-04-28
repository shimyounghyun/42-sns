const checkDates = (
  startUpdate: string | null,
  endUpdate: string | null,
  startAt: string,
  endAt: string
): boolean => {
  if (startUpdate !== null && endUpdate !== null) {
    if (endUpdate >= startUpdate) return true;
    else return false;
  } else if (startUpdate === null && endUpdate !== null) {
    if (endUpdate >= startAt) return true;
    else return false;
  } else if (startUpdate !== null && endUpdate === null) {
    if (endAt >= startUpdate) return true;
    else return false;
  } else return false;
};

export default checkDates;

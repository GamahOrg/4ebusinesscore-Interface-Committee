import moment from "moment-timezone";

export const timeZone = (date: string | Date) => {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const serverDate = (window as any)._env_?.SERVER_TIME_ZONE;

  const offsetMinutes = moment.tz(serverDate, userTimeZone).utcOffset();

  return moment(date).add(offsetMinutes, "minutes").toDate();
};

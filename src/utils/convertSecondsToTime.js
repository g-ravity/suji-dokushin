export default convertSecondsToTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  seconds = (seconds % 3600) % 60;
  let time = "";
  if (hours > 0) time += `${hours}:`;
  if (minutes >= 10) time += `${minutes}:`;
  else time += `0${minutes}:`;
  if (seconds >= 10) time += seconds;
  else time += `0${seconds}`;
  return time;
};

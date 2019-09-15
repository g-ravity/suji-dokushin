export default isPencilArrayEmpty = arr => {
  for (i = 0; i < 9; i++) {
    if (arr[i]) return false;
  }
  return true;
};

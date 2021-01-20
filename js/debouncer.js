//debouncer function
function debouncer(fn, DEBOUNCER_TIME_OUT) {
  let timeOut;
  let alreadyRanOnUpdate = false;

  function setAlreadyRanOnUpdate(bool) {
    alreadyRanOnUpdate = bool;
  }

  const fnCaller = (args) => {
    clearTimeout(timeOut);

    !alreadyRanOnUpdate && fn(args);

    setAlreadyRanOnUpdate(true);

    timeOut = setTimeout(() => {
      setAlreadyRanOnUpdate(false);
    }, DEBOUNCER_TIME_OUT);
  };

  return fnCaller;
}

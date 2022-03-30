export function throttle(func, timeout = 300) {
  let timer;
  let lastTime = Date.now();
  return (...args) => {
    clearTimeout(timer);
    let timeDiff = timeout + lastTime - Date.now();
    if (timeDiff < 0) {
      func.apply(this, args);
      lastTime = Date.now();
      return;
    }
    timer = setTimeout(() => {
      func.apply(this, args);
      lastTime = Date.now();
    }, timeDiff);
  };
}

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

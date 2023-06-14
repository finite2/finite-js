export function throttle<T extends (...args: any[]) => any>(func: T, timeout = 300) {
  let timer: NodeJS.Timeout;
  let lastTime = Date.now();
  return function (this: any, ...args: any[]) {
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
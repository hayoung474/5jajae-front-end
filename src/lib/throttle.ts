const throttle = <A extends any[]>(
    callback: (...args: A) => void,
    t: number
  ) => {
    let timer: number | null = null;
  
    return (...args: A): void => {
      if (timer) {
        return;
      }
      timer = window.setTimeout(() => {
        callback(...args);
        timer = null;
      }, t);
    };
  };
  
  export default throttle;
  
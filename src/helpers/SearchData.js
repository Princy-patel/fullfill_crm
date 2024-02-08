export const debounce = function (mainFunction, delay = 300) {
    let searchTimer;
    return function (...args) {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        mainFunction(...args);
      }, delay);
    };
  };
  
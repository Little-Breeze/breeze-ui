export const getScrollTop = () => {
  let curTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
  return curTop;
};

export const setScrollTop = val => {
  document.body.scrollTop = val;
  document.documentElement.scrollTop = val;
}
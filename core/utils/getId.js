export const getId = (head = "", dash = true) =>
  head +
  (dash ? "-" : "") +
  [...Array(15)].map(i => (~~(Math.random() * 36)).toString(36)).join("");

export const getID = (head = "", dash = !!head) =>
  head +
  (dash ? "-" : "") +
  [...Array(15)].map(() => (~~(Math.random() * 36)).toString(36)).join("");

export const sum = (data) => {
  if (!data?.length) {
    return undefined;
  }
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total += data[i];
  }
  return total;
};

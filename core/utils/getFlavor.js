const flavors = {
  default: true,
  light: true,
  success: true,
  danger: true,
  white: true,
  defaultBorder: true
};
export const getFlavor = (props, fallback = "default") => {
  if (props.flavor && flavors[props.flavor]) return props.flavor;

  let keys = Object.keys(flavors);
  for (const flavor of keys) {
    if (typeof props[flavor] === "boolean") return flavor;
  }

  return fallback;
};

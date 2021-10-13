const flavors = {
  default: true,
  primary: true,
  secondary: true,
  success: true,
  warning: true,
  danger: true,
};
export const getFlavor = (props, fallback = "default") => {
  if (props.flavor && flavors[props.flavor]) return props.flavor;

  let keys = Object.keys(flavors);
  for (const flavor of keys) {
    if (typeof props[flavor] === "boolean" && props[flavor]) return flavor;
  }

  return fallback;
};

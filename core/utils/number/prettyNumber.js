export const prettyNumber = (number, options = {}) => {
  const { sf = 4, prefix = "" } = options;
  return toEngineering(number, { sf, prefix });
};

const toEngineering = (value, options = {}) => {
  const { sf = 4, prefix = "" } = options;
  if (value === undefined || value === null) {
    return "-";
  }

  let sign = value > 0;
  value = value > 0 ? value : -value;
  if (value < 1e-15) {
    return "0";
  }
  let suffices = ["f", "p", "n", "μ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
  let tenLog = Math.floor(Math.log10(value));
  let suffix = suffices[5 + Math.floor(tenLog / 3)];

  let signif = Math.floor(tenLog / 3) * 3;
  let powSuffix = Math.pow(10, signif);

  return `${sign ? "" : "-"}${prefix}${(value / powSuffix).toFixed(
    Math.max(0, sf - (tenLog - signif + 1))
  )}${suffix}`;
};

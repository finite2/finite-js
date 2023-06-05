import dayjs from "dayjs";

const SECS_IN_DAY = 86400000;

export const dateAxesProps = (xDomain) => {
  const range = xDomain[1] - xDomain[0];

  const days = range / SECS_IN_DAY;

  let values = [];

  let d = dayjs(xDomain[0]);

  if (days > 80) {
    d = d.startOf("month");

    while (d.valueOf() < xDomain[1]) {
      values.push(d.valueOf());

      d = d.add(1, "month");
    }

    return {
      tickValues: values,
      tickFormat: (t) => {
        const d = dayjs(t);
        if (d.get("month") === 1) {
          return d.format("YYYY");
        } else {
          return d.format("MMM");
        }
      },
    };
  } else if (days > 30) {
    d = d.startOf("week");

    while (d.valueOf() < xDomain[1]) {
      values.push(d.valueOf());

      d = d.add(1, "week");
    }

    return {
      tickValues: values,
      tickFormat: (t) => {
        const d = dayjs(t);
        if (d.get("date") < 8) {
          return d.format("MMM");
        } else {
          return d.format("D");
        }
      },
    };
  } else {
    d = d.startOf("day");

    while (d.valueOf() < xDomain[1]) {
      values.push(d.valueOf());

      d = d.add(1, "day");
    }

    return {
      tickValues: values,
      tickFormat: (t) => {
        const d = dayjs(t);
        if (d.get("date") === 1) {
          return d.format("MMM");
        } else {
          return d.format("D");
        }
      },
    };
  }
};
